import mongoose from "mongoose";

//este es el bueno 

const contratoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  
  contrato: {
    fechaInicio: { type: Date, default: null },
    fechaFin: { type: Date, default: null },
    firmado: { type: Boolean, default: false },
    tipo: { type: String, enum: ["30", "60", "90", "Permanente"], default: "Permanente" }
  },

  tarjetaSalud: {
    fechaEmision: { type: Date, default: null },
    vigente: { type: Boolean, default: false }
  },

  diasRestantes: { type: Number, default: 0 },
  mesesRestantesTarjeta: { type: Number, default: 0 }

}, { timestamps: true });

export default mongoose.model("Contratos", contratoSchema);
