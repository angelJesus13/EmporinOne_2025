import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const res = await fetch('http://10.0.27.49:3001/auth/login', {
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
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo o número de colaborador"
        value={identificador}
        onChangeText={setIdentificador}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 8 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
