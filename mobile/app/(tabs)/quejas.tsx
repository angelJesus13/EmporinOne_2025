import { View, Text, StyleSheet } from 'react-native';

export default function Quejas() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Quejas y Sugerencias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
