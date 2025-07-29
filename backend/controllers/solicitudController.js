import Solicitud from '../models/solicitud.js';
import Tramite from '../models/tramite.js';
import Usuario from '../models/usuario.js';

// Crear nueva solicitud
export const crearSolicitud = async (req, res) => {
  try {
    const nueva = new Solicitud(req.body);
    const guardada = await nueva.save();

    // Buscar trámite y su categoría
    const tramite = await Tramite.findById(guardada.tramiteId);
    const categoria = tramite.categoria;

    // Buscar responsable de esa categoría
    const responsable = await Usuario.findOne({ categoria, rol: `responsable${categoria}` });

    if (responsable) {
      console.log(`Notificar a ${responsable.nombre} sobre nueva solicitud de ${guardada.nombre}`);
      // Aquí podrías enviar correo o agregar a su panel
    }

    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la solicitud', error });
  }
};

// Obtener solicitudes por categoría
export const obtenerPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const tramites = await Tramite.find({ categoria });
    const tramiteIds = tramites.map(t => t._id);

    const solicitudes = await Solicitud.find({ tramiteId: { $in: tramiteIds } }).populate('tramiteId');
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes por categoría', error });
  }
};

// Obtener historial por colaborador
export const obtenerPorColaborador = async (req, res) => {
  try {
    const { correo } = req.params;
    const solicitudes = await Solicitud.find({ correo }).populate('tramiteId');
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial', error });
  }
};


export const actualizarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const solicitud = await Solicitud.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    res.json(solicitud);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar estado', error });
  }
};