import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/LOGO-CUN-03.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      {/* Header con avatar de usuario */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} color="#0057B7" />
        <Text style={styles.username}>Hola, Colaborador</Text>
      </View>

      {/* Logo principal */}
    
      <Text style={styles.title}>Bienvenido a EmporinOne</Text>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/tramites/indexTramites')}
        >
          <Ionicons name="document-text-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Consulta de Trámites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/reporte/indexReportes')}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Quejas y Sugerencias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/tarjetas/indexTarjetas')}
        >
          <Ionicons name="card-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Renovación de Tarjetas</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: '#0000',
  },
  imageStyle: {
    opacity: 0.05,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 18,
    marginLeft: 8,
    color: '#333',
    fontWeight: '500',
  },
  logo: {
    width: 160,
    height: 80,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0057B7',
    marginBottom: 24,
  },
  menu: {
    marginTop: 10,
    gap: 16,
  },
  button: {
    backgroundColor: '#0057B7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
  },
});
