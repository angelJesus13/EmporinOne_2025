import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  correo: { type: String, required: true, unique: true }, 
  numeroColaborador: { type: String, required: true }, 

  contraseña: { type: String, required: true },
  rol: { type: String, default: "colaborador" },
  firebaseToken: { type: String },

  preguntaSeguridad: { type: String, required: true },
  respuestaSeguridad: { type: String, required: true },

  contrato: {
    fechaInicio: { type: Date },
    fechaFin: { type: Date },
    firmado: { type: Boolean, default: false }
  },

  tarjetaSalud: {
    fechaEmision: { type: Date }
  },

  fechaRegistro: { type: Date, default: Date.now }

}, { timestamps: true });

export default mongoose.model("Contratos", usuarioSchema);
