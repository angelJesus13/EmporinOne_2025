import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function ForgotPassword() {
  const router = useRouter();
  const [numero_colaborador, setNColaborador] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleReset = () => {
    // Aquí iría tu lógica de recuperación
    alert('Respuesta de pregunta de recuperación enviada');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recuperar Contraseña</Text>

      <Text style={styles.label}>Número de Colaborador</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 12345"
        placeholderTextColor="#aaa"
        value={numero_colaborador}
        onChangeText={setNColaborador}
        keyboardType="numeric"
      />

      <Text style={styles.label}>¿Cuál fue el nombre de tu primera mascota?</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Rocky"
        placeholderTextColor="#aaa"
        value={respuesta}
        onChangeText={setRespuesta}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Enviar respuesta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4e73df',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
