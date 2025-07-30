import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reporteRoutes from './routes/reporteRoutes.js';  
import tramitesRoutes from './routes/tramitesRoutes.js';
import solicitudesRoutes from './routes/solicitudesRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/reportes', reporteRoutes); //ruta para manejar reportes CRUD
app.use('/tramites',tramitesRoutes)
app.use('/solicitudes', solicitudesRoutes); //ruta para manejar solicitudes CRUD
app.use('/auth', authRoutes);
    

app.get('/', (req, res) => {
  res.send('¡Hola, pepax!');
});
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
  });
});
