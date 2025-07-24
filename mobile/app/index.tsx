import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Inicio() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a EmporinOne</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/tramites/indexTramites')}>
        <Text style={styles.buttonText}>Consulta de Trámites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/reporte/indexReportes')}>
        <Text style={styles.buttonText}>Quejas y Sugerencias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/tarjetas/indexTarjetas')}>
        <Text style={styles.buttonText}>Renovación de Tarjetas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  button: {
    backgroundColor: '#0057B7',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
