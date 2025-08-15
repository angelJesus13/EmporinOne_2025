import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

interface Usuario {
  _id: string;
  nombreCompleto: string;
  correo: string;
  numeroColaborador: string;
  contrato: {
    fechaInicio?: Date | null;
    fechaFin?: Date | null;
    firmado?: boolean;
    tipo?: string; // "30", "60", "90", "Permanente"
  };
  tarjetaSalud?: {
    fechaEmision?: Date | null;
    vigente?: boolean;
  };
}

export default function VistaRHReportes() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  const API_URL = 'http://192.168.100.19:3001/api/contratos-salud';

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      const mappedUsuarios: Usuario[] = res.data.map((c: any) => ({
        _id: c._id,
        nombreCompleto: c.usuarioId.nombreCompleto,
        correo: c.usuarioId.correo,
        numeroColaborador: c.usuarioId.numeroColaborador,
        contrato: {
          ...c.contrato,
          tipo: c.contrato.tipo || 'Permanente',
          fechaInicio: c.contrato.fechaInicio ? new Date(c.contrato.fechaInicio) : null,
          fechaFin: c.contrato.fechaFin ? new Date(c.contrato.fechaFin) : null,
        },
        tarjetaSalud: c.tarjetaSalud
          ? {
              ...c.tarjetaSalud,
              fechaEmision: c.tarjetaSalud.fechaEmision ? new Date(c.tarjetaSalud.fechaEmision) : null,
              vigente: c.tarjetaSalud.vigente ?? false,
            }
          : undefined,
      }));
      setUsuarios(mappedUsuarios);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron obtener los usuarios');
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const editarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalVisible(true);
  };

  const guardarCambios = async () => {
    if (!usuarioSeleccionado) return;

    // Calcular fechaFin según tipo de contrato
    if (usuarioSeleccionado.contrato.fechaInicio && usuarioSeleccionado.contrato.tipo !== 'Permanente') {
      const dias = parseInt(usuarioSeleccionado.contrato.tipo || '0');
      usuarioSeleccionado.contrato.fechaFin = moment(usuarioSeleccionado.contrato.fechaInicio)
        .add(dias, 'days')
        .toDate();
    } else if (usuarioSeleccionado.contrato.tipo === 'Permanente') {
      usuarioSeleccionado.contrato.fechaFin = null;
    }

    // Calcular fechaEmision de tarjeta de salud si está vigente
    if (usuarioSeleccionado.tarjetaSalud?.vigente) {
      usuarioSeleccionado.tarjetaSalud.fechaEmision = new Date();
    } else if (usuarioSeleccionado.tarjetaSalud) {
      usuarioSeleccionado.tarjetaSalud.fechaEmision = null;
    }

    try {
      await axios.put(`${API_URL}/${usuarioSeleccionado._id}`, usuarioSeleccionado);
      setModalVisible(false);
      obtenerUsuarios();
      Alert.alert('Éxito', 'Usuario actualizado');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron guardar los cambios');
    }
  };

  const renderItem = ({ item }: { item: Usuario }) => {
    const diasRestantesContrato = item.contrato.fechaFin
      ? moment(item.contrato.fechaFin).diff(moment(), 'days')
      : 'No disponible';
    const mesesRestantesTarjeta = item.tarjetaSalud?.fechaEmision
      ? Math.max(0, 6 - moment().diff(moment(item.tarjetaSalud.fechaEmision), 'months'))
      : 'No disponible';

    return (
      <TouchableOpacity onPress={() => editarUsuario(item)} style={styles.item}>
        <Text style={styles.nombre}>{item.nombreCompleto}</Text>
        <Text>Colaborador: {item.numeroColaborador}</Text>
        <Text>Contrato firmado: {item.contrato.firmado ? 'Sí' : 'No'}</Text>
        <Text>Días restantes contrato: {diasRestantesContrato}</Text>
        <Text>Meses restantes tarjeta: {mesesRestantesTarjeta}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={usuarios} keyExtractor={(item) => item._id} renderItem={renderItem} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Editar Usuario</Text>

          <Text>Nombre completo:</Text>
          <TextInput
            style={styles.input}
            value={usuarioSeleccionado?.nombreCompleto ?? ''}
            onChangeText={(text) =>
              setUsuarioSeleccionado((prev) => prev && { ...prev, nombreCompleto: text })
            }
          />

          <Text>Correo:</Text>
          <TextInput
            style={styles.input}
            value={usuarioSeleccionado?.correo ?? ''}
            onChangeText={(text) =>
              setUsuarioSeleccionado((prev) => prev && { ...prev, correo: text })
            }
          />

          <Text>Tipo de contrato:</Text>
          <Picker
            selectedValue={usuarioSeleccionado?.contrato.tipo}
            onValueChange={(value: string) =>
              setUsuarioSeleccionado((prev) => prev && { 
                ...prev, 
                contrato: { ...prev.contrato, tipo: value } 
              })
            }
          >
            <Picker.Item label="30 días" value="30" />
            <Picker.Item label="60 días" value="60" />
            <Picker.Item label="90 días" value="90" />
            <Picker.Item label="Permanente" value="Permanente" />
          </Picker>

          <Text>Contrato firmado:</Text>
          <Picker
            selectedValue={usuarioSeleccionado?.contrato.firmado ? 'true' : 'false'}
            onValueChange={(value: string) =>
              setUsuarioSeleccionado((prev) => prev && { 
                ...prev, 
                contrato: { ...prev.contrato, firmado: value === 'true' } 
              })
            }
          >
            <Picker.Item label="Sí" value="true" />
            <Picker.Item label="No" value="false" />
          </Picker>

          <Text>Fecha inicio contrato:</Text>
          <TextInput
            style={styles.input}
            value={usuarioSeleccionado?.contrato.fechaInicio ? moment(usuarioSeleccionado.contrato.fechaInicio).format('YYYY-MM-DD') : ''}
            onChangeText={(text) =>
              setUsuarioSeleccionado((prev) => prev && { 
                ...prev, 
                contrato: { ...prev.contrato, fechaInicio: text ? new Date(text) : null } 
              })
            }
          />

          <Text>Tarjeta de salud vigente:</Text>
          <Picker
            selectedValue={usuarioSeleccionado?.tarjetaSalud?.vigente ? 'true' : 'false'}
            onValueChange={(value: string) =>
              setUsuarioSeleccionado((prev) => prev && { 
                ...prev, 
                tarjetaSalud: { 
                  ...prev.tarjetaSalud, 
                  vigente: value === 'true' 
                } 
              })
            }
          >
            <Picker.Item label="Sí" value="true" />
            <Picker.Item label="No" value="false" />
          </Picker>

          <Button title="Guardar cambios" onPress={guardarCambios} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  modal: { flex: 1, padding: 20, justifyContent: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }
});
