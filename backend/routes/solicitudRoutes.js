import express from 'express';
import { getAllSolicitudes, getSolicitudById, createSolicitud } from '../controllers/solicitudController.js';
router.get('/por-categoria/:categoria', async (req, res) => {
  const { categoria } = req.params;
  const tramites = await Tramite.find({ categoria });
  const tramiteIds = tramites.map(t => t._id);

  const solicitudes = await Solicitud.find({ tramiteId: { $in: tramiteIds } }).populate('tramiteId');
  res.json(solicitudes);
});