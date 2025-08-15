import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

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
    '¿Cuál es tu comida favorita?',
  ];

  const handleRegister = async () => {
    if (contraseña !== confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (
      !nombreCompleto ||
      !numeroColaborador ||
      !contraseña ||
      !preguntaSeguridad ||
      !respuestaSeguridad
    ) {
      Alert.alert('Error', 'Por favor llena todos los campos obligatorios');
      return;
    }

    try {

      const response = await fetch('http://192.168.100.19:3001/auth/register', {
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
        // Guardar número de colaborador en AsyncStorage
        await AsyncStorage.setItem('numeroColaborador', numeroColaborador.trim());

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
    <ImageBackground
      source={require('../assets/images/LOGO-CUN-03.jpg')}
      resizeMode="contain"
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      {/* Botón regresar con color negro */}
      <TouchableOpacity
        onPress={() => router.push('/login')}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Inicio</Text>
      </TouchableOpacity>

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

        <Text style={{ marginBottom: 4, fontWeight: 'bold' }}>
          Pregunta de seguridad
        </Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000',
  },
  imageStyle: {
    opacity: 0.1,
    position: 'absolute',
    width: 200,
    height: 200,
    top: '50%',
    left: '50%',
    marginLeft: -100,
    marginTop: -100,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  backText: {
    marginLeft: 8,
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  container: { flex: 1, justifyContent: 'center', padding: 24, width: '100%' },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 8 },
  button: {
    backgroundColor: '#007AF4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
