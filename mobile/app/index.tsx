import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Trámites: undefined;
  Reportes: undefined;
  Tarjetas: undefined;
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a EmporinOne</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Trámites')}
      >
        <Text style={styles.buttonText}>Trámites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reportes')}
      >
        <Text style={styles.buttonText}>Quejas y Sugerencias</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tarjetas')}
      >
        <Text style={styles.buttonText}>Renovación de Tarjetas</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define your colors object
const colors = {
  seasalt: '#F8F8F8',
  unBlue: '#0057B7'
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.seasalt },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  button: {
    backgroundColor: colors.unBlue,
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold' }
});

export default HomeScreen;
