// backend/utils/pushNotifications.js
import axios from 'axios';

/**
 * Envía una notificación push usando Expo
 * @param {string} expoPushToken - Token del dispositivo
 * @param {string} title - Título de la notificación
 * @param {string} body - Cuerpo de la notificación
 */
export async function sendPushNotification(expoPushToken, title, body) {
  if (!expoPushToken) {
    console.error("No hay token de destino");
    return;
  }

  try {
    await axios.post('https://exp.host/--/api/v2/push/send', {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
    });
    console.log(`Notificación enviada a ${expoPushToken}`);
  } catch (error) {
    console.error("Error enviando notificación:", error.message);
  }
}
