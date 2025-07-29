import Usuario from '../models/usuario.js';
import Tramite from '../models/tramite.js';

export const crearSolicitud = async (req, res) => {
  try {
    const nueva = new Solicitud(req.body);
    const guardada = await nueva.save();

    const tramite = await Tramite.findById(guardada.tramiteId);
    const categoria = tramite.area;

    // Buscar al responsable del área
    const responsable = await Usuario.findOne({ area, rol: `responsable${area}` });

    if (responsable) {
      // Aquí puedes enviarle una notificación (correo, mensaje interno, etc.)
      console.log(`Notificar a ${responsable.nombre} sobre nueva solicitud`);
    }

    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la solicitud' });
  }
};