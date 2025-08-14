import mongoose from "mongoose";

const contratoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  contrato: {
    fechaInicio: { type: Date, default: null },
    fechaFin: { type: Date, default: null },
    firmado: { type: Boolean, default: false }
  },
  tarjetaSalud: {
    fechaEmision: { type: Date, default: null }
  },
  diasRestantes: { type: Number, default: 0 },
  mesesRestantesTarjeta: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Contrato", contratoSchema);
