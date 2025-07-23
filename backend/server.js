import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reporteRoutes from './routes/reporteRoutes.js';  

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/reportes', reporteRoutes); //ruta para manejar reportes CRUD

app.get('/', (req, res) => {
  res.send('¡Hola, pepax!');
});
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
  });
});
