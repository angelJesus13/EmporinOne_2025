import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Reporte = {
  _id: string;
  tipo: 'queja' | 'sugerencia' | 'otro';
  categoria: string;
  descripcion: string;
  fecha: string;
  estado: 'pendiente' | 'en revisión' | 'resuelto' | 'atencion RH';
  comentario?: string;
};

export default function ReportesAdmin() {
  const router = useRouter();
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});

  const fetchReportes = async () => {
    try {
      const res = await fetch('http://10.0.24.137:3001/reportes');
      const data: Reporte[] = await res.json();
      setReportes(data);
    } catch (error) {
      console.error('Error al obtener reportes:', error);
    }
  };

  const cambiarEstado = async (id: string, nuevoEstado: Reporte['estado'], comentario: string) => {
    try {
      const res = await fetch(`http://10.0.24.137:3001/reportes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado, comentario }),
      });

      if (res.ok) {
        Alert.alert('Estado actualizado');
        fetchReportes();
        setComentarios((prev) => ({ ...prev, [id]: '' }));
      } else {
        Alert.alert('Error al actualizar');
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const handleRegresar = () => {
    router.push('/(tabs)/rh-admin');
  };

  const handleVerTodos = () => {
    router.push('/reporte/generalReportes');
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  const renderItem = ({ item }: { item: Reporte }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.tipo.toUpperCase()} - {item.categoria}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.estado}>
        Estado: <Text style={{ fontWeight: 'bold' }}>{item.estado}</Text>
      </Text>
      <Text style={styles.fecha}>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>

      <TextInput
        placeholder="Agregar comentario (opcional)"
        style={styles.comentarioInput}
        value={comentarios[item._id] || ''}
        onChangeText={(text) =>
          setComentarios((prev) => ({ ...prev, [item._id]: text }))
        }
      />

      <View style={styles.botonesContainer}>
        <TouchableOpacity
          style={styles.botonMitad}
          onPress={() => cambiarEstado(item._id, 'resuelto', comentarios[item._id] || '')}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color="white" />
          <Text style={styles.botonTexto}> Resuelto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonMitad, { backgroundColor: '#FF9500' }]}
          onPress={() => cambiarEstado(item._id, 'atencion RH', comentarios[item._id] || '')}
        >
          <Ionicons name="people-outline" size={18} color="white" />
          <Text style={styles.botonTexto}> Atención RH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/LOGO-CUN-03 2.jpg')}
      style={styles.fondo}
      imageStyle={{ opacity: 0.08, resizeMode: 'contain', width: '100%', height: '100%' }}
    >
      {/* Header con botones regresar y ver todos */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleRegresar}>
          <Ionicons name="arrow-back-outline" size={16} color="#0057B7" />
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generalButton} onPress={handleVerTodos}>
          <Ionicons name="list-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={reportes.filter(r => r.estado !== 'resuelto')}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#0057B7',
    fontWeight: '600',
    marginLeft: 4,
  },
  generalButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  fecha: { color: '#777', fontSize: 12, marginBottom: 8 },
  comentarioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonMitad: {
    flex: 0.48,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: '600',
  },
});
