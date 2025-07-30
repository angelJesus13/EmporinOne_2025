import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';

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
    '¿Cuál es el nombre de tu primera mascota?',
    '¿Cuál es el nombre de tu ciudad natal?',
    '¿Cuál es tu comida favorita?'
  ];

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
      const response = await fetch('http://10.0.27.49:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCompleto,
          numeroColaborador,
          correo,
          contraseña,
          firebaseToken,
          preguntaSeguridad,
          respuestaSeguridad
        })
      });
    
      const data = await response.json();
    
      if (response.ok) {
        const { rol } = data;
        Alert.alert('Éxito', `Usuario registrado con rol: ${rol}`);
    
        if (rol === 'rh_admin') {
          router.replace('/rh-admin');
        } else if (rol === 'super_admin') {
          router.replace('/super-admin');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        Alert.alert('Error', data.mensaje || 'Error en el registro');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
    
  };

  return (
    <View style={styles.container}>
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

      <Text style={{ marginBottom: 4, fontWeight: 'bold' }}>Pregunta de seguridad</Text>
      <Picker
        selectedValue={preguntaSeguridad}
        onValueChange={(itemValue) => setPreguntaSeguridad(itemValue)}
        style={{ marginBottom: 12 }}
      >
        <Picker.Item label="Selecciona una pregunta" value="" />
        {preguntas.map((pregunta, index) => (
          <Picker.Item key={index} label={pregunta} value={pregunta} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Respuesta de seguridad"
        value={respuestaSeguridad}
        onChangeText={setRespuestaSeguridad}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 8 },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
