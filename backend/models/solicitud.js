import mongoose from'mongoose'

const solicitudSchema = new mongoose.Schema({
  colaborador: {
    type: String,
    required: true  
    },
    nombre: String,
    correo: String,
    mensaje:String,
    tramiteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tramite',
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'en_proceso', 'completado'],
        default: 'pendiente'
    }
});

const Solicitud = mongoose.model('Solitud', solicitudSchema);
export default Solicitud;