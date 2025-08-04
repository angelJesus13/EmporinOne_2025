import Reporte from '../models/Reporte.js';

// Crear reporte
export const crearReporte = async (req, res) => {
  try {
    const nuevoReporte = new Reporte(req.body);
    const guardado = await nuevoReporte.save();
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

// Obtener un solo reporte
export const obtenerReportePorId = async (req, res) => {
  try {
    const reporte = await Reporte.findById(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar reporte' });
  }
};

export const actualizarReporte = async (req, res) => {
  console.log('Actualizar reporte ID:', req.params.id);
  console.log('Datos recibidos para actualizar:', req.body);

  try {
    const actualizado = await Reporte.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'Reporte no encontrado' });
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
