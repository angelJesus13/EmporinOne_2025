import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('✅ Conexión a MongoDB Atlas exitosa');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1); 
  }
};

export default connectDB;
