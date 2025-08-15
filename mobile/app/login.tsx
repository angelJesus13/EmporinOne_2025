import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'https://d77878dfce5c.ngrok-free.app';


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
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identificador, contraseña }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error('Respuesta no es JSON:', text);
        Alert.alert('Error', 'Respuesta inesperada del servidor');
        return;
      }

      if (!res.ok) {
        Alert.alert('Error', data.mensaje || 'Error al iniciar sesión');
        return;
      }

      const { id, nombre, rol } = data.usuario;

      await AsyncStorage.setItem('usuario', JSON.stringify({ id, nombre, rol }));
      await AsyncStorage.setItem('usuarioId', id);

      Alert.alert('Bienvenido', `Hola ${nombre}`);

      if (rol === 'super_admin') router.replace('/(tabs)/super-admin');
      else if (rol === 'rh_admin') router.replace('/(tabs)/rh-admin');
      else router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <Text style={styles.backText}>Inicio</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Iniciar Sesión</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo o número de colaborador"
              placeholderTextColor="#aaa"
              value={identificador}
              onChangeText={setIdentificador}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={contraseña}
              onChangeText={setContraseña}
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <LinearGradient colors={['#0057B7', '#007AFF']} style={styles.loginGradient}>
              <Text style={styles.loginText}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text onPress={() => router.push('/forgotPassword')} style={styles.link}>
            ¿Olvidaste tu contraseña?
          </Text>
          <Text onPress={() => router.push('/register')} style={styles.link}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    position: 'absolute',
    top: 50,
    left: 24,
  },
  backText: { marginLeft: 6, color: '#fff', fontSize: 16, fontWeight: '500' },
  title: { fontSize: 26, marginBottom: 30, textAlign: 'center', color: '#fff', fontWeight: 'bold' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, height: 48, color: '#fff', fontSize: 16 },
  loginButton: { borderRadius: 10, overflow: 'hidden', marginTop: 5 },
  loginGradient: { paddingVertical: 14, alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.5 },
  link: { color: '#fff', marginTop: 14, textAlign: 'center', fontSize: 14 },
  wrapper: { flex: 1 },
});
