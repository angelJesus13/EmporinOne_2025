import mongoose from 'mongoose'

const tramiteSchema = new mongoose.Schema({
  nombreTramite:
  {
    type:String,
    required:true
  },
  requisitos:{
    type:String,
    required:true
  },
  categoria:{
    type:String, 
    required:true
  }
});

const Tramite = mongoose.model('Tramite', tramiteSchema);
export default Tramite;