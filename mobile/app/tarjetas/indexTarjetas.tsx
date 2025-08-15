import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tarjetas() {
  const [estado, setEstado] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const numeroColaborador = await AsyncStorage.getItem('numeroColaborador');
        if (!numeroColaborador) throw new Error('No se encontró el número de colaborador del usuario');

        const res = await fetch(`http://192.168.100.19:3001/api/contratos-salud/colaborador/${numeroColaborador}`);
        if (!res.ok) throw new Error('Error al obtener datos del usuario del backend');

        const data = await res.json();
        setEstado(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  if (cargando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando información...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const contrato = estado.contrato;
  const tarjeta = estado.tarjetaSalud;

  const contratoFirmado = contrato?.firmado ?? false;
  const diasRestantes = contrato?.diasRestantes ?? (contrato?.fechaFin ? 0 : 'Permanente');
  const fechaFin = contrato?.fechaFin ? new Date(contrato.fechaFin).toLocaleDateString() : 'Permanente';

  const tarjetaVigente = tarjeta?.vigente ?? false;
  const mesesRestantes = tarjeta?.mesesRestantes ?? 0;
  const necesitaRenovacion = tarjetaVigente ? mesesRestantes <= 1 : true;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Renovación de Tarjetas de Salud</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información del Colaborador</Text>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{estado.nombreCompleto || 'No disponible'}</Text>
        <Text style={styles.label}>Contrato firmado:</Text>
        <Text style={styles.value}>{contratoFirmado ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Días restantes contrato:</Text>
        <Text style={styles.value}>{diasRestantes}</Text>
        <Text style={styles.label}>Fecha fin contrato:</Text>
        <Text style={styles.value}>{fechaFin}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tarjeta de Salud</Text>
        <Text style={styles.label}>Vigente:</Text>
        <Text style={[styles.value, { color: tarjetaVigente ? 'green' : 'red' }]}>
          {tarjetaVigente ? 'Sí' : 'No'}
        </Text>
        <Text style={styles.label}>Meses restantes para renovación:</Text>
        <Text style={styles.value}>{mesesRestantes}</Text>
        {necesitaRenovacion && (
          <Text style={styles.alertText}>Debe renovar la tarjeta pronto</Text>
        )}
        <Text style={styles.noteText}>
          Nota: Haga caso omiso si su área no requiere contar con tarjeta de salud.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#333' },
  errorText: { fontSize: 16, color: 'red' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 14, color: '#555', marginTop: 5 },
  value: { fontSize: 16, color: '#333', fontWeight: '500' },
  alertText: { color: 'red', fontWeight: 'bold', marginTop: 10 },
  noteText: { fontSize: 12, color: '#777', marginTop: 10, fontStyle: 'italic' },
});
