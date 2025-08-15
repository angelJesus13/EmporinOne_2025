import express from 'express';
import { obtenerContratoUsuario } from '../controllers/contratos_saludController.js';
import Contrato from '../models/contrato.js';
import Usuario from '../models/Usuario.js';


const router = express.Router();



router.get('/colaborador/:numeroColaborador', obtenerContratoUsuario);

// Obtener todos los contratos con info del usuario
router.get('/todos', async (req, res) => {
  try {
    const contratos = await Contrato.find()
      .populate('usuarioId', 'nombreCompleto correo numeroColaborador');
    res.json(contratos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener contratos' });
  }
});

// Actualizar contrato o datos
router.put('/:id', async (req, res) => {
  try {
    const contratoActualizado = await Contrato.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contratoActualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar contrato' });
  }
});

// Eliminar contrato
router.delete('/:id', async (req, res) => {
  try {
    await Contrato.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contrato eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar contrato' });
  }
});

export default router;
