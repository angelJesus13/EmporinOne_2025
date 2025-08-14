import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Aquí es donde se monta la ruta base
app.use('/api/auth', authRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
