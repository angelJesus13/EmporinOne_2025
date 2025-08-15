// indexReportes.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

// URL del backend (sin espacios extra)
const API_URL =
  (Constants.expoConfig?.extra?.API_URL || 'https://5f05bd0ac1ab.ngrok-free.app').trim();

export default function Reportes() {
  const router = useRouter();

  const [tipo, setTipo] = useState('queja');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [otroTipo, setOtroTipo] = useState('');
  const [otraCategoria, setOtraCategoria] = useState('');
  const [rol, setRol] = useState<'admin' | 'colaborador' | null>(null);

  useEffect(() => {
    const fetchRol = async () => {
      const storedRol = 'colaborador';
      setRol(storedRol as 'admin' | 'colaborador');
    };
    fetchRol();
  }, []);

  const enviarReporte = async () => {
    const finalTipo = tipo === 'otro' ? otroTipo : tipo;
    const finalCategoria =
      categoriaSeleccionada === 'otra' ? otraCategoria : categoriaSeleccionada;

    if (!finalTipo || !finalCategoria || !descripcion) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      console.log('Enviando reporte a:', `${API_URL}/reportes`);
      console.log({
        tipo: finalTipo,
        categoria: finalCategoria,
        descripcion,
      });

      const response = await axios.post(
        `${API_URL}/reportes`,
        {
          tipo: finalTipo,
          categoria: finalCategoria,
          descripcion,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 8000,
        }
      );

      Alert.alert('Éxito', 'Reporte enviado correctamente.');
      setTipo('queja');
      setCategoriaSeleccionada('');
      setDescripcion('');
      setOtroTipo('');
      setOtraCategoria('');
    } catch (error: any) {
      console.error('Error enviando reporte:', error);

      if (error.response) {
        // Respuesta del servidor con código de error
        console.error('Respuesta del servidor:', error.response.data);
        Alert.alert(
          'Error',
          `El servidor respondió con un error (${error.response.status}): ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        // No hubo respuesta del servidor
        console.error('No hubo respuesta del servidor:', error.request);
        Alert.alert(
          'Error de conexión',
          'No se pudo contactar con el servidor. Verifica tu conexión o que ngrok esté activo.'
        );
      } else {
        // Error al configurar la solicitud
        console.error('Error al configurar la solicitud:', error.message);
        Alert.alert('Error', `Ocurrió un error: ${error.message}`);
      }
    }
  };

  const cerrarSesion = () => {
    Alert.alert('Cerrar sesión', '¿Deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: () => {
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <LinearGradient colors={['#f0f4ff', '#dce8ff']} style={styles.gradient}>
      <Image
        source={require('../../assets/images/LOGO-CUN-03.jpg')}
        style={styles.backgroundLogo}
        resizeMode="contain"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Regresar</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Quejas y Sugerencias</Text>

          <Text style={styles.label}>Tipo</Text>
          <Picker
            selectedValue={tipo}
            onValueChange={(value) => setTipo(value)}
            style={styles.picker}
          >
            <Picker.Item label="Queja" value="queja" />
            <Picker.Item label="Sugerencia" value="sugerencia" />
            <Picker.Item label="Otro" value="otro" />
          </Picker>

          {tipo === 'otro' && (
            <TextInput
              style={styles.input}
              placeholder="Especifica el tipo"
              value={otroTipo}
              onChangeText={setOtroTipo}
            />
          )}

          <Text style={styles.label}>Categoría</Text>
          <Picker
            selectedValue={categoriaSeleccionada}
            onValueChange={(value) => setCategoriaSeleccionada(value)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una opción" value="" />
            <Picker.Item label="Horarios" value="Horarios" />
            <Picker.Item label="Instalaciones" value="Instalaciones" />
            <Picker.Item label="Compañeros" value="Compañeros" />
            <Picker.Item label="Supervisión" value="Supervisión" />
            <Picker.Item label="Otra" value="otra" />
          </Picker>

          {categoriaSeleccionada === 'otra' && (
            <TextInput
              style={styles.input}
              placeholder="Especifica la categoría"
              value={otraCategoria}
              onChangeText={setOtraCategoria}
            />
          )}

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe tu queja o sugerencia"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={enviarReporte}>
            <Text style={styles.buttonText}>Enviar Reporte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 60,
    alignItems: 'center',
  },
  backgroundLogo: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.6,
    opacity: 0.15,
    top: '30%',
    alignSelf: 'center',
    zIndex: -1,
  },
  container: { width: '90%', paddingHorizontal: 20, paddingBottom: 30 },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  backButtonText: { fontSize: 16, color: '#0057B7', fontWeight: '600' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#003366',
  },
  label: { fontSize: 16, marginTop: 15, marginBottom: 5, color: '#333' },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: {
    backgroundColor: '#0057B7',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
