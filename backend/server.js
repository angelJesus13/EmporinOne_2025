import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reporteRoutes from './routes/reporteRoutes.js';  
import tramitesRoutes from './routes/tramitesRoutes.js';
import solicitudesRoutes from './routes/solicitudesRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/reportes', reporteRoutes); //ruta para manejar reportes CRUD
app.use('/tramites',tramitesRoutes)
app.use('/solicitudes', solicitudesRoutes); //ruta para manejar solicitudes CRUD
//app.use('/contratos_tarjetas_salud',contratos_saludRoutes)
    

app.get('/', (req, res) => {
  res.send('¡Hola, pepax!');
});
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
  });
});
