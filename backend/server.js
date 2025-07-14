import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});


connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
  });
});
