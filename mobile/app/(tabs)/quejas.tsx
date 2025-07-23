// app/(tabs)/quejas.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function QuejasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Quejas y Sugerencias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});
