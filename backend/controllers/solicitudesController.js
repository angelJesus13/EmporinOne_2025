import Solicitud from '../models/solicitud.js';
import cron from 'node-cron';

/**
 * Limpieza diaria de solicitudes finalizadas
 * Se ejecuta todos los días a las 11:59 PM
 */
cron.schedule('59 23 * * *', async () => {
  try {
    const resultado = await Solicitud.deleteMany({ estado: 'Finalizado' });
    console.log('Solicitudes eliminadas:', resultado.deletedCount);
  } catch (error) {
    console.error('Error al limpiar solicitudes:', error);
  }
});

/**
 * Valida los campos requeridos de una solicitud
 */
function validarSolicitud({ nombre, correo, colaborador, tramiteId, usuarioId }) {
  const errores = [];

  if (!nombre || nombre.trim() === '') errores.push('El nombre es obligatorio');
  if (!correo || !/\S+@\S+\.\S+/.test(correo.trim())) errores.push('El correo no es válido');
  if (!colaborador || colaborador.trim() === '') errores.push('El número de colaborador es obligatorio');
  if (!tramiteId || tramiteId.trim() === '') errores.push('El trámite es obligatorio');
  if (!usuarioId || usuarioId.trim() === '') errores.push('El ID del usuario es obligatorio');

  return errores;
}

/**
 * Crea una nueva solicitud
 */
export const crearSolicitud = async (req, res) => {
  const errores = validarSolicitud(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
  }

  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ error: 'Error al crear solicitud', detalle: error.message });
  }
};


export const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find()
      .populate('tramiteId', 'nombreTramite categoria');
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};


export const obtenerSolicitudesPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const solicitudes = await Solicitud.find({ usuarioId })
      .populate('tramiteId', 'nombreTramite categoria');
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes del usuario:', error);
    res.status(500).json({ error: 'Error al obtener solicitudes del usuario' });
  }
};


export const updateEstadoSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['Pendiente', 'En proceso', 'Finalizado'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const solicitud = await Solicitud.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.json(solicitud);
  } catch (error) {
    console.error('Error al actualizar estado de la solicitud:', error);
    res.status(500).json({ error: 'Error al actualizar estado de la solicitud' });
  }
};
