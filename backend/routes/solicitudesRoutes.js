import express from 'express';
import {crearSolicitud, obtenerSolicitudes,updateEstadoSolicitud} from '../controllers/solicitudesController.js';

const router = express.Router();

router.post('/', crearSolicitud); 
router.get('/', obtenerSolicitudes);
router.put('/:id/estado', updateEstadoSolicitud); 

export default router;