import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function Register() {
  const router = useRouter();

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [numeroColaborador, setNumeroColaborador] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [preguntaSeguridad, setPreguntaSeguridad] = useState('');
  const [respuestaSeguridad, setRespuestaSeguridad] = useState('');

  const firebaseToken = 'token_de_prueba_o_real';
  const preguntas = [
    '¿Nombre de tu primera mascota?',
    '¿Nombre de tu ciudad natal?',
    '¿Cuál es tu comida favorita?',
  ];

  const API_URL = Constants.expoConfig?.extra?.API_URL || 'https://d9058d416679.ngrok-free.app';

  const handleRegister = async () => {
    if (contraseña !== confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (!nombreCompleto || !numeroColaborador || !contraseña || !preguntaSeguridad || !respuestaSeguridad) {
      Alert.alert('Error', 'Por favor llena todos los campos obligatorios');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCompleto,
          numeroColaborador,
          correo,
          contraseña,
          firebaseToken,
          preguntaSeguridad,
          respuestaSeguridad,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { rol } = data;
        Alert.alert('Éxito', `Usuario registrado con rol: ${rol}`);

        if (rol === 'rh_admin') router.replace('/rh-admin');
        else if (rol === 'super_admin') router.replace('/super-admin');
        else router.replace('/(tabs)');
      } else {
        Alert.alert('Error', data.mensaje || 'Error en el registro');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/LOGO-CUN-03.jpg')}
      resizeMode="contain"
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <TouchableOpacity onPress={() => router.push('/login')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Inicio</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Registro</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de colaborador"
            value={numeroColaborador}
            onChangeText={setNumeroColaborador}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo (opcional)"
            value={correo}
            keyboardType="email-address"
            onChangeText={setCorreo}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={contraseña}
            onChangeText={setContraseña}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmarContraseña}
            onChangeText={setConfirmarContraseña}
          />

          <Text style={styles.label}>Pregunta de seguridad</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={preguntaSeguridad}
              onValueChange={(itemValue) => setPreguntaSeguridad(itemValue)}
            >
              <Picker.Item label="Selecciona una pregunta" value="" />
              {preguntas.map((pregunta, index) => (
                <Picker.Item key={index} label={pregunta} value={pregunta} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Respuesta de seguridad"
            value={respuestaSeguridad}
            onChangeText={setRespuestaSeguridad}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#f0f4f7' },
  imageStyle: { opacity: 0.05, position: 'absolute', width: 250, height: 250, top: '40%', left: '50%', marginLeft: -125, marginTop: -125 },
  backButton: {
    flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 50, left: 24, zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.85)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 25,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2
  },
  backText: { marginLeft: 8, color: '#000', fontSize: 16, fontWeight: '500' },
  container: { padding: 24, paddingTop: 120, paddingBottom: 40 },
  title: { fontSize: 28, marginBottom: 24, fontWeight: 'bold', textAlign: 'center', color: '#0057B7' },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
    borderWidth: 1, borderColor: '#ddd'
  },
  label: { fontWeight: '600', marginBottom: 6, color: '#333' },
  pickerContainer: {
    backgroundColor: '#fff', borderRadius: 12, marginBottom: 16,
    borderWidth: 1, borderColor: '#ddd', overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  button: {
    backgroundColor: '#007AF4', padding: 16, borderRadius: 12, alignItems: 'center',
    shadowColor: '#007AF4', shadowOpacity: 0.4, shadowRadius: 6, elevation: 3
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
