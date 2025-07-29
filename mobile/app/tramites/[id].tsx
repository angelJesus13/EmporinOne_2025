import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

type Tramite = {
  _id: string;
  nombreTramite: string;
  categoria: string;
  requisitos: string;
  horario: string;
  tiempoEstimado: string;
};

export default function TramiteDetalleScreen() {
  const { id } = useLocalSearchParams();
  const [tramite, setTramite] = useState<Tramite | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Campos del formulario
  const [colaborador, setColaborador] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`http://10.7.64.153:3001/tramites/${id}`)
        .then((res) => {
          setTramite(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error al obtener trámite:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const enviarSolicitud = () => {
    const datos = {
      colaborador,
      nombre,
      correo,
      mensaje,
      tramiteId: tramite?._id,
    };
    console.log('Solicitud enviada:', datos);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#335C81" />
        <Text>Cargando trámite...</Text>
      </View>
    );
  }

  if (!tramite) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el trámite.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card compacta */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{tramite.nombreTramite}</Text>
        <Text style={styles.cardText}>Categoría: {tramite.categoria}</Text>
        <Text style={styles.cardText}>Requisitos: {tramite.requisitos}</Text>
        <Text style={styles.cardText}>Horario: {tramite.horario}</Text>
        <Text style={styles.cardText}>Tiempo estimado: {tramite.tiempoEstimado}</Text>
      </View>

 
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMostrarFormulario(!mostrarFormulario)}
      >
        <Text style={styles.buttonText}>
          {mostrarFormulario ? 'Cancelar solicitud' : 'Solicitar trámite'}
        </Text>
      </TouchableOpacity>


      {mostrarFormulario && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Número de colaborador"
            value={colaborador}
            onChangeText={setColaborador}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Mensaje (opcional)"
            value={mensaje}
            onChangeText={setMensaje}
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={enviarSolicitud}>
            <Text style={styles.submitText}>Enviar solicitud</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#F8F8F8',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#E6F0FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0057B7',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#0057B7',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  input: {
    borderColor: '#A3C9F9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#F8F8F8',
  },
  submitButton: {
    backgroundColor: '#335C81',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});