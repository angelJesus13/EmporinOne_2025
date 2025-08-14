import express from 'express';
import { register, login, obtenerPreguntaSeguridad, verificarRespuesta, actualizarContraseña } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Aquí agregas tus rutas para recuperar contraseña
router.get('/pregunta/:identificador', obtenerPreguntaSeguridad);
router.post('/verificar-respuesta', verificarRespuesta);
router.post('/actualizar-contraseña', actualizarContraseña);

export default router;
