const express = require('express');
const router = express.Router();
const contratosSaludController = require('../controllers/contratos_saludController');

// Endpoint para obtener el estado del usuario por email
router.get('/:email', contratosSaludController.obtenerEstadoUsuario);

module.exports = router;
