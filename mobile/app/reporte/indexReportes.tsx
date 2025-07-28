import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

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
      const response = await axios.post('http://10.0.27.54:PORT/api/reportes', {
        tipo,
        categoria,
        descripcion,
      });

      Alert.alert('Éxito', 'Reporte enviado correctamente.');
      // Limpia el formulario
      setCategoria('');
      setDescripcion('');
      setTipo('queja');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo enviar el reporte.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Quejas y Sugerencias</Text>

      <Text style={styles.label}>Tipo</Text>
      <Picker
        selectedValue={tipo}
        style={styles.input}
        onValueChange={(itemValue) => setTipo(itemValue)}
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
        style={[styles.input, styles.multiline]}
        placeholder="Describe tu queja o sugerencia"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />

      <Button title="Enviar Reporte" onPress={enviarReporte} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
