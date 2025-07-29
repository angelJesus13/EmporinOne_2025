import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  colaborador: { type: String, required: true }, // Ej: código interno o número de empleado

  contrato: {
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    firmado: { type: Boolean, default: false }
  },

  tarjetaSalud: {
    fechaEmision: { type: Date, required: true }
  }

}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);
