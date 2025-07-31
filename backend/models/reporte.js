import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['queja', 'sugerencia', 'otro'], // opicon adicional para el picker dentro del formulario, es decir información adicional que seleccione algun colaborador
    required: true,
  },
  categoria: {
    type: String, 
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en revisión', 'resuelto'],
    default: 'pendiente',
  }
});

const Reporte = mongoose.model('Reporte', reporteSchema, 'QuejasSugerencias');

export default Reporte;
