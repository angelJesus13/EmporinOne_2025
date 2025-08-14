import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['queja', 'sugerencia', 'otro'],
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
    enum: ['pendiente', 'en revisión', 'resuelto', 'atencion RH',],
    default: 'pendiente',
  },
  comentario: {
    type: String,
    default: '',
  },
});

const Reporte = mongoose.model('Reporte', reporteSchema, 'QuejasSugerencias');

export default Reporte;
