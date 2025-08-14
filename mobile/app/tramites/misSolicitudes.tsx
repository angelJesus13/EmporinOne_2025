import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

type Tramite = {
  _id: string;
  nombreTramite: string;
  categoria: string;
  requisitos: string;
  horario: string;
  tiempoEstimado: string;
};

type Solicitud = {
  _id: string;
  nombre: string;
  correo: string;
  colaborador: string;
  mensaje?: string;
  estado?: string;
  tramiteId: Tramite;

};

export default function AdminSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [actualizando, setActualizando] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Administración del personal');

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const obtenerSolicitudes = () => {
    axios.get('http://192.168.100.19:3001/solicitudes')
      .then(res => setSolicitudes(res.data))
      .catch(err => console.error('Error al obtener solicitudes', err));
  };

  const actualizarEstado = (id: string, nuevoEstado: string) => {
    setActualizando(id);
    axios.put(`http://192.168.100.19:3001/solicitudes/${id}/estado`, { estado: nuevoEstado })
      .then(() => {
        obtenerSolicitudes(); 
        Alert.alert('Éxito', 'Estado actualizado');
      })
      .catch(err => {
        console.error('Error al actualizar estado', err);
        Alert.alert('Error', 'No se pudo actualizar el estado');
      })
      .finally(() => setActualizando(''));
  };
  

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return '#f40400ff';
      case 'En proceso':
        return '#FB8C00';
      case 'Finalizado':
        return '#0F9D58';
      default:
        return '#333';
    }
  };

  const solicitudesFiltradas = solicitudes.filter(
    s => s.tramiteId?.categoria === categoriaSeleccionada
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Solicitudes por Categoría</Text>

      <Text style={styles.label}>Seleccionar categoría:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoriaSeleccionada}
          onValueChange={(itemValue) => setCategoriaSeleccionada(itemValue)}
        >
          <Picker.Item label="Administración del personal" value="Administración del personal" color="#335C81"/>
          <Picker.Item label="Capacitación" value="Capacitación" color="#335C81" />
          <Picker.Item label="Reclutamiento" value="Reclutamiento"  color="#335C81"/>
        </Picker>
      </View>

      <Text style={styles.seccionTitulo}>{categoriaSeleccionada}</Text>

      {solicitudesFiltradas.length === 0 ? (
        <Text style={styles.sinDatos}>Sin solicitudes en esta categoría</Text>
      ) : (
        solicitudesFiltradas.map(s => (
          <View key={s._id} style={styles.card}>
            <Text style={styles.cardTitle}>{s.tramiteId.nombreTramite}</Text>
            <Text>Colaborador: {s.colaborador}</Text>
            <Text>Nombre: {s.nombre}</Text>
            <Text>Correo: {s.correo}</Text>
            <Text>Mensaje: {s.mensaje || 'Sin mensaje'}</Text>
            <Text style={[styles.estado, { color: obtenerColorEstado(s.estado || 'Pendiente') }]}>
              Estado actual: {s.estado || 'Pendiente'}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#0057B7' }}>
                Cambiar estado:
            </Text>
            <Picker
              selectedValue={s.estado || 'Pendiente'}
              onValueChange={(itemValue) => actualizarEstado(s._id, itemValue)}
              enabled={actualizando !== s._id}
              style={styles.picker}
            >
                <Picker.Item label="Pendiente" value="Pendiente" color="#335C81" />
                <Picker.Item label="En proceso" value="En proceso" color="#335C81" />
                <Picker.Item label="Finalizado" value="Finalizado" color="#335C81" />
            </Picker>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 6 },
  pickerContainer: {
    backgroundColor: '#E6F0FA',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  seccionTitulo: { fontSize: 20, fontWeight: 'bold', color: '#0057B7', marginBottom: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: '#335C81', marginBottom: 4 },
  sinDatos: { fontStyle: 'italic', color: '#999' },
    picker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#335C81',
    paddingHorizontal: 10,
    marginTop: 8,
    color: '#335C81',
    },

estado: {
  fontWeight: 'bold',
  marginTop: 6,
  fontSize: 14,
},
card: {
  backgroundColor: '#FFFFFF',
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  elevation: 3,
  borderLeftWidth: 4,
  borderLeftColor: '#0057B7',
},
});
