import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function Reportes() {
  const [tipo, setTipo] = useState('queja');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const enviarReporte = async () => {
    if (!categoria || !descripcion) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://10.0.27.54:3001/reportes', {
        tipo,
        categoria,
        descripcion,
      });

      console.log(response.data);
      Alert.alert('Éxito', 'Reporte enviado correctamente.');
      setCategoria('');
      setDescripcion('');
      setTipo('queja');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo enviar el reporte.');
    }
  };

  return (
    <LinearGradient colors={['#f0f4ff', '#dce8ff']} style={styles.gradient}>
      <Image
        source={require('../../assets/images/LOGO-CUN-03.jpg')} 
        style={styles.backgroundLogo}
        resizeMode="contain"
      />

      <View style={styles.container}>
        <Text style={styles.title}>Quejas y Sugerencias</Text>

        <Text style={styles.label}>Tipo</Text>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Queja" value="queja" />
          <Picker.Item label="Sugerencia" value="sugerencia" />
        </Picker>

        <Text style={styles.label}>Categoría</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Horarios, Instalaciones..."
          value={categoria}
          onChangeText={setCategoria}
        />

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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backgroundLogo: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.6,
    opacity: 0.15,
    top: '30%',
    alignSelf: 'center',
    zIndex: -1,
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    shadowOpacity: 0.01,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#003366',
  },
  label: { fontSize: 16, marginTop: 15, marginBottom: 5, color: '#333' },
  picker: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderRadius: 10,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
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
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
