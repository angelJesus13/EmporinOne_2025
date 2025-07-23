import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a EmporinOne!</Text>
      <Text style={styles.text}>Módulo de Quejas y Sugerencias</Text>

      <TextInput
        style={styles.input}
        placeholder="Num.Colaborador ej"
      />

      <Button title="Enviar" onPress={() => alert('Enviado')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20
  },
  text: {
    fontSize: 18, marginBottom: 10
  },
  input: {
    height: 40, borderColor: '#ccc', borderWidth: 1, width: '100%', marginBottom: 10, paddingHorizontal: 10
  }
});
