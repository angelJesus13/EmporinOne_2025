import { View, Text, StyleSheet } from 'react-native';

export default function Tramites() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Consulta de Trámites y Servicios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
