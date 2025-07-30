import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  numeroColaborador: { type: String, required: true, unique: true },
  correo: { type: String, unique: true, sparse: true },
  contraseña: { type: String, required: true },
  rol: {
    type: String,
    enum: ['colaborador', 'rh_admin', 'super_admin'],
    required: true
  },
  firebaseToken: { type: String, required: true },
  preguntaSeguridad: { type: String, required: true },
  respuestaSeguridad: { type: String, required: true }, // Hasheada
  fechaRegistro: { type: Date, default: Date.now }
});

export default mongoose.model('Usuario', usuarioSchema);
