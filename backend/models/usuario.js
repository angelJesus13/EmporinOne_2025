import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  numColaborador:Number,
  nombre:String,
  rol:String,
  categoria:String
});    