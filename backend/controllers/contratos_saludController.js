const ContratoSalud = require('../models/contratos_salud');
const moment = require('moment');

exports.obtenerEstadoUsuario = async (req, res) => {
  try {
    const { email } = req.params;

    const usuario = await ContratoSalud.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const hoy = moment();
    const fechaFin = moment(usuario.fechaFinContrato);
    const fechaTarjeta = moment(usuario.fechaExpedicionTarjetaSalud);

    const diasRestantesContrato = fechaFin.diff(hoy, 'days');
    const tarjetaSaludVencida = hoy.diff(fechaTarjeta, 'months') >= 6;
    const mesesRestantesTarjeta = 6 - hoy.diff(fechaTarjeta, 'months');

    return res.json({
      nombre: usuario.nombre,
      contrato: {
        firmado: usuario.firmado,
        diasRestantes: diasRestantesContrato,
        fechaFin: usuario.fechaFinContrato
      },
      tarjetaSalud: {
        vencida: tarjetaSaludVencida,
        mesesRestantes: tarjetaSaludVencida ? 0 : mesesRestantesTarjeta
      }
    });

  } catch (error) {
    console.error('Error al obtener datos del usuario', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
