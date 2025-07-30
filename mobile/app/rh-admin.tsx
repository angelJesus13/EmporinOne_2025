import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function RhAdmin() {
  const router = useRouter();

  const irAReportes = () => {
    router.push('/reporte/reportesAdmin');
  };
  const irASolicitudes = () => {
    router.push('/tramites/misSolicitudes');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido RH Admin</Text>
      <TouchableOpacity style={styles.boton} onPress={irASolicitudes}>
        <Text style={styles.textoBoton}>Ver trámites y servicios</Text> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={irAReportes}>
        <Text style={styles.textoBoton}>Ver reportes de quejas y sugerencias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  titulo: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
  boton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
