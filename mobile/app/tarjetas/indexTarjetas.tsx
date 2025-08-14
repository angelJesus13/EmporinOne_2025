import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tarjetas() {
  const [estado, setEstado] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // 📌 1. Obtener email del usuario guardado en AsyncStorage
        const emailUsuario = await AsyncStorage.getItem('emailUsuario');

        if (!emailUsuario) {
          throw new Error('No se encontró el email del usuario');
        }

        // 📌 2. Llamar a tu API
        const res = await fetch(`http://192.168.100.16:3001/api/contratos-salud/${emailUsuario}`);
        if (!res.ok) {
          throw new Error('Error al obtener datos del usuario');
        }

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
          <Text>👤 Nombre: {estado.nombre}</Text>
          <Text>📅 Contrato firmado: {estado.contrato.firmado ? 'Sí' : 'No'}</Text>
          <Text>⏳ Días restantes contrato: {estado.contrato.diasRestantes}</Text>
          <Text>📆 Fecha fin contrato: {new Date(estado.contrato.fechaFin).toLocaleDateString()}</Text>
          <Text>💳 Tarjeta vencida: {estado.tarjetaSalud.vencida ? 'Sí' : 'No'}</Text>
          <Text>🗓 Meses restantes tarjeta: {estado.tarjetaSalud.mesesRestantes}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
