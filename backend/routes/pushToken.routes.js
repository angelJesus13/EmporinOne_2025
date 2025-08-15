import express from 'express';
import PushToken from '../models/pushToken.js';

const router = express.Router();

router.post('/save-token', async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    let pushToken = await PushToken.findOne({ userId });
    if (pushToken) {
      pushToken.token = token;
      await pushToken.save();
    } else {
      await PushToken.create({ userId, token });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error guardando token' });
  }
});

export default router;
