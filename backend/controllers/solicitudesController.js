import Solicitud from '../models/solicitud.js';
import cron from 'node-cron';

// Tarea programada: eliminar solicitudes finalizadas todos los días a las 11:59 PM
cron.schedule('59 23 * * *', async () => {
  try {
    const resultado = await Solicitud.deleteMany({ estado: 'Finalizado' });
    console.log('Solicitudes eliminadas:', resultado.deletedCount);
  } catch (error) {
    console.error('Error al limpiar solicitudes:', error);
  }
});

// Validar campos básicos
function validarSolicitud({ nombre, correo, colaborador, tramiteId }) {
  const errores = [];

  if (!nombre || nombre.trim() === '') errores.push('El nombre es obligatorio');
  if (!correo || !/\S+@\S+\.\S+/.test(correo)) errores.push('El correo no es válido');
  if (!colaborador || colaborador.trim() === '') errores.push('El número de colaborador es obligatorio');
  if (!tramiteId) errores.push('El trámite es obligatorio');

  return errores;
}

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
    const solicitudes = await Solicitud.find().populate('tramiteId', 'nombreTramite categoria');
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

export const updateEstadoSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['Pendiente', 'En proceso', 'Finalizado'].includes(estado)) {
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
    res.status(500).json({ error: 'Error al actualizar estado de la solicitud' });
  }
};
