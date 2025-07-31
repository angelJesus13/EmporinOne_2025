import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
  title: '', // Header sin texto
};

export default function Inicio() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/ExtCun.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <ImageBackground
            source={require('../assets/images/LOGO-CUN-03 2.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.welcomeText}>Bienvenido a EmporinOne</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
    
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
  },
  logoContainer: {
    backgroundColor: 'white',
    borderRadius: 150,
    padding: 30,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 150,
    height: 150,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0057B7',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0057B7',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#0057B7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
