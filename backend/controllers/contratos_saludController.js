import Contrato from '../models/contrato.js';
import Usuario from '../models/Usuario.js';
import moment from 'moment';

export const obtenerContratoUsuario = async (req, res) => {
  try {
    const { numeroColaborador } = req.params;

    // 1️⃣ Buscar al usuario
    const usuario = await Usuario.findOne({ numeroColaborador });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    // 2️⃣ Buscar su contrato
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
        firmado: contratoFirmado,
        diasRestantes: diasRestantesContrato ?? "No disponible",
        fechaFin: fechaFinContrato ? fechaFinContrato.toDate() : null
      },
      tarjetaSalud: {
        vencida: tarjetaSaludVencida ?? "No disponible",
        mesesRestantes: mesesRestantesTarjeta ?? "No disponible"
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};