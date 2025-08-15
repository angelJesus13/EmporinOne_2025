// backend/controllers/reportesController.js
import Reporte from '../models/Reporte.js';
import PushToken from '../models/pushToken.js';
import { sendPushNotification } from '../utils/pushNotifications.js';
import Usuario from '../models/Usuario.js'; // asumiendo que tienes un modelo Usuario

// Crear reporte
export const crearReporte = async (req, res) => {
  try {
    const nuevoReporte = new Reporte(req.body);
    const guardado = await nuevoReporte.save();

    // Notificar a todos los administradores
    const admins = await Usuario.find({ rol: 'admin' });
    const tokens = await PushToken.find({ userId: { $in: admins.map(a => a._id) } });

    tokens.forEach(t => {
      sendPushNotification(t.token, 'Nuevo reporte recibido', `Tipo: ${guardado.tipo}, Categoría: ${guardado.categoria}`);
    });

    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear reporte', detalle: error.message });
  }
};

// Obtener todos los reportes
export const obtenerReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find();
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

// Obtener reporte por ID
export const obtenerReportePorId = async (req, res) => {
  try {
    const reporte = await Reporte.findById(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar reporte' });
  }
};

// Actualizar reporte
export const actualizarReporte = async (req, res) => {
  try {
    const actualizado = await Reporte.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'Reporte no encontrado' });

    // Notificar al colaborador dueño del reporte si cambió el estado
    if (req.body.estado) {
      const pushToken = await PushToken.findOne({ userId: actualizado.userId });
      if (pushToken) {
        sendPushNotification(
          pushToken.token,
          'Actualización de tu reporte',
          `El estado de tu reporte ha cambiado a: ${actualizado.estado}`
        );
      }
    }

    res.json(actualizado);
  } catch (error) {
    console.error('Error actualizar reporte:', error);
    res.status(400).json({ error: 'Error al actualizar reporte' });
  }
};

// Eliminar reporte
export const eliminarReporte = async (req, res) => {
  try {
    const eliminado = await Reporte.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json({ mensaje: 'Reporte eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar reporte' });
  }
};
