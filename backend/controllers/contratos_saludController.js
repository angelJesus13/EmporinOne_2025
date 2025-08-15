import Contrato from '../models/contrato.js';
import Usuario from '../models/Usuario.js';
import moment from 'moment';

export const obtenerContratoUsuario = async (req, res) => {
  try {
    const { numeroColaborador } = req.params;

    const usuario = await Usuario.findOne({ numeroColaborador });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    const contratoDoc = await Contrato.findOne({ usuarioId: usuario._id });
    if (!contratoDoc) return res.status(404).json({ message: 'Contrato no encontrado' });

    const hoy = moment();

    // Contrato
    let diasRestantesContrato = null;
    let fechaFinContrato = null;
    let contratoFirmado = false;

    if (contratoDoc.contrato?.fechaFin) {
      fechaFinContrato = moment(contratoDoc.contrato.fechaFin);
      diasRestantesContrato = fechaFinContrato.diff(hoy, 'days');
      contratoFirmado = contratoDoc.contrato.firmado ?? false;
    }

    // Tarjeta de salud
    let tarjetaSaludVencida = null;
    let mesesRestantesTarjeta = null;
    if (contratoDoc.tarjetaSalud?.fechaEmision) {
      const fechaTarjeta = moment(contratoDoc.tarjetaSalud.fechaEmision);
      tarjetaSaludVencida = hoy.diff(fechaTarjeta, 'months') >= 6;
      mesesRestantesTarjeta = tarjetaSaludVencida ? 0 : 6 - hoy.diff(fechaTarjeta, 'months');
    }

    res.json({
  nombreCompleto: usuario.nombreCompleto,
  contrato: {
    firmado: contratoDoc.contrato.firmado ?? false,
    diasRestantes: contratoDoc.contrato.fechaFin
      ? moment(contratoDoc.contrato.fechaFin).diff(moment(), 'days')
      : 'Permanente',
    fechaFin: contratoDoc.contrato.fechaFin ?? null
  },
  tarjetaSalud: {
    vigente: contratoDoc.tarjetaSalud.vigente ?? false,
    mesesRestantes: contratoDoc.tarjetaSalud.fechaEmision
      ? Math.max(0, 6 - moment().diff(moment(contratoDoc.tarjetaSalud.fechaEmision), 'months'))
      : 0
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};