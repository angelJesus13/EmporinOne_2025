import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

type Reporte = {
  _id: string;
  tipo: 'queja' | 'sugerencia' | 'otro';
  categoria: string;
  descripcion: string;
  fecha: string;
  estado: 'pendiente' | 'en revisión' | 'resuelto' | 'atencion RH';
  comentario?: string;
};

// URL del backend, configurable
const API_URL = 'https://d77878dfce5c.ngrok-free.app';

export default function GeneralReportes() {
  const router = useRouter();
  const [reportes, setReportes] = useState<Reporte[]>([]);

  const fetchReportes = async () => {
    try {
      const res = await fetch(`${API_URL}/reportes`);
      const text = await res.text();
  
      // Si empieza con < probablemente es HTML y no JSON
      if (text.trim().startsWith("<")) {
        console.error("❌ El servidor devolvió HTML en lugar de JSON:");
        console.error(text);
        return;
      }
  
      const data: Reporte[] = JSON.parse(text);
      setReportes(data);
    } catch (error) {
      console.error("Error al obtener reportes:", error);
    }
  };
  

  useEffect(() => {
    fetchReportes();
  }, []);

  const handleRegresar = () => {
    router.push('/reporte/reportesAdmin');
  };

  const renderItem = ({ item }: { item: Reporte }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>
        {item.tipo.toUpperCase()} - {item.categoria}
      </Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.estado}>
        Estado: <Text style={{ fontWeight: 'bold' }}>{item.estado}</Text>
      </Text>
      <Text style={styles.fecha}>
        Fecha: {new Date(item.fecha).toLocaleDateString()}
      </Text>
      {item.comentario ? (
        <Text style={styles.comentario}>Comentario: {item.comentario}</Text>
      ) : null}
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/LOGO-CUN-03 2.jpg')}
      style={styles.fondo}
      imageStyle={{
        opacity: 0.08,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleRegresar}>
          <Ionicons name="arrow-back-outline" size={16} color="#0057B7" />
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reportes}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1, padding: 16 },
  header: { marginTop: 36, marginBottom: 10, flexDirection: 'row', justifyContent: 'flex-start' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backButtonText: { fontSize: 16, color: '#0057B7', fontWeight: '600', marginLeft: 4 },
  card: {
    backgroundColor: '#ffffffdd',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  titulo: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  descripcion: { marginBottom: 4 },
  estado: { color: '#444', marginBottom: 2 },
  fecha: { color: '#777', fontSize: 12, marginBottom: 4 },
  comentario: { fontStyle: 'italic', fontSize: 12, color: '#333' },
});
