import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type Solicitud = {
  _id: string;
  tramiteId: string;
  tramiteNombre?: string; // ← este se agregará después de la petición
  estado: string;
  mensaje: string;
  fecha: string;
};

export default function SolicitudesPorUsuario() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolicitudesConTramite = async () => {
      const usuarioRaw = await AsyncStorage.getItem('usuario');
      const usuarioId = usuarioRaw ? JSON.parse(usuarioRaw).id : null;

      if (!usuarioId) {
        alert('No se encontró el usuario. Inicia sesión nuevamente.');
        return;
      }

      try {
        const res = await axios.get(`http://10.7.64.143:3001/solicitudes/usuario/${usuarioId}`);
        const solicitudesOriginales: Solicitud[] = res.data;

        const solicitudesConNombre = await Promise.all(
          solicitudesOriginales.map(async (solicitud) => {
            try {
              const tramiteRes = await axios.get(`http://10.7.64.143:3001/tramites/${solicitud.tramiteId}`);
              return {
                ...solicitud,
                tramiteNombre: tramiteRes.data.nombreTramite,
              };
            } catch (e) {
              console.error('Error al obtener trámite', solicitud.tramiteId);
              return {
                ...solicitud,
                tramiteNombre: 'Nombre no disponible',
              };
            }
          })
        );

        setSolicitudes(solicitudesConNombre);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener solicitudes:', err);
        setLoading(false);
      }
    };

    fetchSolicitudesConTramite();
  }, []);

  const getEstadoStyle = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return { backgroundColor: '#FFBABA' };
      case 'en proceso':
        return { backgroundColor: '#FFE5B4' };
      case 'finalizado':
        return { backgroundColor: '#C6F6C4' };
      default:
        return { backgroundColor: '#DDD' };
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#335C81" />
        <Text>Cargando tus solicitudes...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {solicitudes.length === 0 ? (
        <Text style={styles.emptyText}>No tienes solicitudes registradas.</Text>
      ) : (
        solicitudes.map((s) => (
          <View key={s._id} style={styles.card}>
            <Text style={styles.title}>{s.tramiteNombre}</Text>
            <View style={[styles.estadoBox, getEstadoStyle(s.estado)]}>
              <Text style={styles.estadoText}>{s.estado}</Text>
            </View>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{new Date(s.fecha).toLocaleDateString()}</Text>
            {s.mensaje && (
              <>
                <Text style={styles.label}>Mensaje:</Text>
                <Text style={styles.value}>{s.mensaje}</Text>
              </>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0057B7',
    marginBottom: 6,
  },
  estadoBox: {
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  estadoText: {
    fontWeight: '600',
    color: '#222',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
});
