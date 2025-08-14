import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Tarjetas() {
  const [estado, setEstado] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const obtenerDatos = async () => {
    try {
      const numeroColaborador = await AsyncStorage.getItem('numeroColaborador');
      if (!numeroColaborador) throw new Error('No se encontró el número de colaborador del usuario');

      const res = await fetch(`http://10.0.24.70:3001/api/contratos-salud/colaborador/${numeroColaborador}`);
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando información...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {estado && (
        <>
          <Text style={styles.title}>Renovación de Tarjetas de Salud</Text>
          <Text>👤 Nombre: {estado.nombre || 'No disponible'}</Text>
          <Text>📅 Contrato firmado: {estado.contrato?.firmado ? 'Sí' : 'No'}</Text>
          <Text>⏳ Días restantes contrato: {estado.contrato?.diasRestantes ?? 'No disponible'}</Text>
          <Text>
            📆 Fecha fin contrato:{' '}
            {estado.contrato?.fechaFin
              ? new Date(estado.contrato.fechaFin).toLocaleDateString()
              : 'No disponible'}
          </Text>
          <Text>💳 Tarjeta vencida: {estado.tarjetaSalud?.vencida ? 'Sí' : 'No'}</Text>
          <Text>🗓 Meses restantes tarjeta: {estado.tarjetaSalud?.mesesRestantes ?? 'No disponible'}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
