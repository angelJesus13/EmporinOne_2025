import express from 'express';
import {
  crearReporte,
  obtenerReportes,
  obtenerReportePorId,
  actualizarReporte,
  eliminarReporte,
} from '../controllers/reporteController.js';

const router = express.Router();
//rutas para peticiones http de los reportes
router.post('/', crearReporte);
router.get('/', obtenerReportes);
router.get('/:id', obtenerReportePorId);
router.put('/:id', actualizarReporte);
router.delete('/:id', eliminarReporte);

export default router;
