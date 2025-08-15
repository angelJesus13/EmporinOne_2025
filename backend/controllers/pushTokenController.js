import PushToken from '../models/pushToken.js';

export const registrarPushToken = async (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) return res.status(400).json({ error: 'Faltan datos' });

  try {
    // Evita duplicados
    const existe = await PushToken.findOne({ userId, token });
    if (!existe) {
      await PushToken.create({ userId, token });
    }
    res.json({ mensaje: 'Token registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar token' });
  }
};
