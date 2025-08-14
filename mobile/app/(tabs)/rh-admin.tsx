import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RhAdmin() {
  const router = useRouter();

  const irAReportes = () => {
    router.push('/reporte/reportesAdmin');
  };

  const cerrarSesion = () => {
    router.replace('/login');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/LOGO-CUN-03.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      {/* Header con avatar y cerrar sesión */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={40} color="#0057B7" />
          <Text style={styles.username}>Hola, Administrador</Text>
        </View>

        <TouchableOpacity style={styles.cerrarButton} onPress={cerrarSesion}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.cerrarText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Bienvenido RH Admin</Text>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={irAReportes}>
          <Ionicons name="clipboard-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Ver reportes de quejas y sugerencias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="medkit-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Tarjeta de Salud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="document-text-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Trámites</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    marginLeft: 8,
    color: '#003366',
    fontWeight: '500',
  },
  cerrarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cerrarText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
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
    backgroundColor: '#007AFF',
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
