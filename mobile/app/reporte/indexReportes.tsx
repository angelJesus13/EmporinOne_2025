import { View, Text, StyleSheet } from 'react-native';

export default function Reportes() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Formulario de Quejas y Sugerencias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
