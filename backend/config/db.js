import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://emporinone:emporinone@emporinone.dgwe1ga.mongodb.net/?retryWrites=true&w=majority&appName=EmporinOne';
    await mongoose.connect(mongoURI);
    console.log('✅ Conexión a MongoDB Atlas exitosa');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1); 
  }
};

export default connectDB;
