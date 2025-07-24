import express from 'express'
import { getAllTramites, getTramiteById, createTramite } from '../controllers/tramitesController.js'

const router = express.Router()

router.get('/', getAllTramites) // Obtener todos los trámites
router.get('/:id', getTramiteById) // Obtener un trámite por ID
router.post('/', createTramite) // Crear un nuevo trámite

export default router