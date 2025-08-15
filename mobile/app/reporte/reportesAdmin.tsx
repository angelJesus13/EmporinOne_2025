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

type Reporte = {
  _id: string;
  tipo: 'queja' | 'sugerencia' | 'otro';
  categoria: string;
  descripcion: string;
  fecha: string;
  estado: 'pendiente' | 'en revisión' | 'resuelto';
  comentario?: string;
};

export default function ReportesAdmin() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});

  const fetchReportes = async () => {
    try {
      const res = await fetch('http://192.168.100.19:3001/reportes');
      const data: Reporte[] = await res.json();
      setReportes(data);
    } catch (error) {
      console.error('Error al obtener reportes:', error);
    }
  };

  const cambiarEstado = async (id: string, nuevoEstado: Reporte['estado'], comentario: string) => {
    try {
      const res = await fetch(`http://192.168.100.19:3001/reportes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado, comentario }),
      });
  
      const text = await res.text();  // Leer el cuerpo como texto
      console.log('Respuesta actualización:', res.status, text);
  
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

      <TouchableOpacity
        style={styles.boton}
        onPress={() => cambiarEstado(item._id, 'resuelto', comentarios[item._id] || '')}
      >
        <Text style={styles.botonTexto}>Marcar como resuelto</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/LOGO-CUN-03 2.jpg')} // Ruta controlada por ti
      style={styles.fondo}
      imageStyle={{ opacity: 0.08 }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Reportes recibidos</Text>
        <FlatList
          data={reportes}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
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
  boton: {
    backgroundColor: '#007AFF' ,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: '600',
  },
});
