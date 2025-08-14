import express from 'express';
import { obtenerContratoUsuario } from '../controllers/contratos_saludController.js';

const router = express.Router();



router.get('/colaborador/:numeroColaborador', obtenerContratoUsuario);

export default router;
