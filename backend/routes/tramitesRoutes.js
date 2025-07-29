import express from 'express'
import { getAllTramites, getTramiteById, createTramite } from '../controllers/tramitesController.js'

const router = express.Router()

router.get('/', getAllTramites)
router.get('/:id', getTramiteById) 
router.post('/', createTramite)

export default router