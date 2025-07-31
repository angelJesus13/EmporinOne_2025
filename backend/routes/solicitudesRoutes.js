import express from 'express';
import {crearSolicitud, obtenerSolicitudes,updateEstadoSolicitud,obtenerSolicitudesPorUsuario} from '../controllers/solicitudesController.js';

const router = express.Router();

router.post('/', crearSolicitud); 
router.get('/', obtenerSolicitudes);
router.put('/:id/estado', updateEstadoSolicitud); 
router.get('/usuario/:usuarioId', obtenerSolicitudesPorUsuario);

export default router;