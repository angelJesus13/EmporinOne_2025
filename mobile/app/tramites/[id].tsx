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
import { crearSolicitud } from './tramitesApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


  const [colaborador, setColaborador] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');


  
  useEffect(() => {
    if (id) {
      axios
        .get(`http://10.0.24.70:3001/tramites/${id}`)
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

const enviarSolicitud = async () => {
  if (!tramite) return;

  const usuarioRaw = await AsyncStorage.getItem('usuario');
  const usuarioId = usuarioRaw ? JSON.parse(usuarioRaw).id : null;

  if (!usuarioId) {
    alert('No se encontró el usuario. Inicia sesión nuevamente.');
    return;
  }

  const correoValido = /\S+@\S+\.\S+/.test(correo);
  if (!colaborador || !nombre || !correo || !correoValido) {
    alert('Por favor, completa todos los campos requeridos con datos válidos.');
    return;
  }

  const datos = {
    colaborador,
    nombre,
    correo,
    mensaje,
    tramiteId: tramite._id,
    usuarioId,
  };

  try {
    const res = await crearSolicitud(datos);
    alert('Solicitud enviada con éxito');
    setMostrarFormulario(false);
    setColaborador('');
    setNombre('');
    setCorreo('');
    setMensaje('');
  } catch (err) {
    console.error('Error al enviar solicitud:', err);
    alert('Error al enviar solicitud. Inténtalo de nuevo más tarde.');
  }
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