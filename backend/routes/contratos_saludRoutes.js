import express from 'express';
import { obtenerEstadoUsuario } from '../controllers/contratos_saludController.js';

const router = express.Router();

// Endpoint para obtener el estado del usuario por email
router.get('/:email', obtenerEstadoUsuario);

export default router;
