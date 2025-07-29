import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { fetchTramites } from './tramitesApi';

type Tramite = {
  _id: string;
  nombreTramite: string;
  categoria: string;
  requisitos: string;
  horario: string;
  tiempoEstimado: string;

};

export default function Tramites() {
  const router = useRouter();
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTramites()
      .then((res) => {
        console.log('Trámites obtenidos:', res.data);
        setTramites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error al obtener trámites:', err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Tramite }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/tramites/${item._id}`)}
    >
      <Text style={styles.cardTitle}>{item.nombreTramite}</Text>
      <Text style={styles.cardCategory}>{item.categoria}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bienvenid@ al modulo de consulta de trámites y servicios de Recursos Humanos</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/tramites/listaTramites')}>
              <Text style={styles.buttonText}>Consulta de trámites y servicios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('./misSolicitudes')}>
              <Text style={styles.buttonText}>Mis solicitudes</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#335C81',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#335C81',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardCategory: {
    color: '#A3C9F9',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0057B7',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },

});
