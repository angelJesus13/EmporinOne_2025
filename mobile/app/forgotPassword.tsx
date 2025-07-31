import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ForgotPassword() {
  const router = useRouter();
  const [numero_colaborador, setNColaborador] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState('');

  // Estado del dropdown
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '¿Cuál es el nombre de tu primera mascota?', value: 'mascota' },
    { label: '¿Cuál es el nombre de tu ciudad natal?', value: 'ciudad' },
    { label: '¿Cuál es tu comida favorita?', value: 'comida' },
  ]);

  const handleReset = () => {
    alert(`Pregunta: ${preguntaSeleccionada}\nRespuesta: ${respuesta}`);
    router.back();
  };

  const isFormValid = numero_colaborador && preguntaSeleccionada && respuesta;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recuperar Contraseña</Text>

      <Text style={styles.label}>Número de Colaborador</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 12345"
        placeholderTextColor="#aaa"
        value={numero_colaborador}
        onChangeText={setNColaborador}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Selecciona la pregunta de seguridad:</Text>
      <DropDownPicker
        open={open}
        value={preguntaSeleccionada}
        items={items}
        setOpen={setOpen}
        setValue={setPreguntaSeleccionada}
        setItems={setItems}
        placeholder="Selecciona una pregunta"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Text style={styles.label}>Respuesta</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Rocky"
        placeholderTextColor="#aaa"
        value={respuesta}
        onChangeText={setRespuesta}
      />

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleReset}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Enviar respuesta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#4e73df',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#a4b0f0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
