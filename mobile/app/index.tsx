import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export const options = {
  title: '',
};

export default function Inicio() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.background}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
        ]}
      >
        <ImageBackground
          source={require('../assets/images/LOGO-CUN-03 2.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Text style={styles.welcomeText}>Bienvenido a EmporinOne</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5F1FF', // Color suave para destacar el logo
  },
  logoContainer: {
    backgroundColor: '#fff',
    borderRadius: 150,
    padding: 30,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#0057B7',
  },
  logo: {
    width: 160,
    height: 160,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0057B7',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0057B7',
    paddingVertical: 16,
    borderRadius: 14,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#0057B7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
