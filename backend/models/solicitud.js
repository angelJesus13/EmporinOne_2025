import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  colaborador:{type:String, required:true},
  nombre:{type:String, required:true},
  correo:{type:String, required:true},
  telefono:{type:String, required:true},
  mensaje:{type:String},
  tramiteId:{type:mongoose.Schema.Types.ObjectId, ref:'Tramite', required:true},
  fecha:{type:Date, default:Date.now},
  estado:{type:String, default:'pendiente'}
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);
export default Solicitud;