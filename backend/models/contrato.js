import mongoose from "mongoose";

const contratoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  contrato: {
    fechaInicio: { type: Date, default: null },
    fechaFin: { type: Date, default: null },
    firmado: { type: Boolean, default: false },
    tipo: { type: String, default: "Permanente" } // Agregado
  },
  tarjetaSalud: {
    fechaEmision: { type: Date, default: null },
    vigente: { type: Boolean, default: false } // Agregado
  },
  diasRestantes: { type: Number, default: 0 },
  mesesRestantesTarjeta: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Contrato", contratoSchema);
