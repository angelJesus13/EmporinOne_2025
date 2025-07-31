import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

export default function Login() {
  const router = useRouter();
  const [identificador, setIdentificador] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    if (!identificador || !contraseña) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      const res = await fetch('http://10.0.27.54:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identificador, contraseña }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', data.mensaje || 'Error al iniciar sesión');
        return;
      }

      const { id, nombre, rol } = data.usuario;
      await AsyncStorage.setItem('usuario', JSON.stringify({ id, nombre, rol }));
      Alert.alert('Bienvenido', `Hola ${nombre}`);

      if (rol === 'super_admin') {
        router.replace('/super-admin');
      } else if (rol === 'rh_admin') {
        router.replace('/rh-admin');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={styles.wrapper}>
      <Video
        source={{ uri: 'https://hotelesemporio.com/wp-content/uploads/2025/04/portadaNueva2025.mp4' }}
        rate={1.0}
        volume={0}
        isMuted
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Inicio</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo o número de colaborador"
          placeholderTextColor="#ccc"
          value={identificador}
          onChangeText={setIdentificador}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña}
        />
        <Button title="Entrar" onPress={handleLogin} />

        <Text onPress={() => router.push('/forgotPassword')} style={styles.link}>
          ¿Olvidaste tu contraseña?
        </Text>
        <Text onPress={() => router.push('/register')} style={styles.link}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  overlay: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 50,
    left: 24,
  },
  backText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center', color: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    color: '#fff',
  },
  link: { color: '#fff', marginTop: 10, textAlign: 'center' },
});
