import ContratoSalud from '../models/contratos_salud.js';
import moment from 'moment';

export const obtenerEstadoUsuario = async (req, res) => {
  try {
    
    const { numeroColaborador } = req.params;

    const usuario = await ContratoSalud.findOne({ numeroColaborador: numeroColaborador.trim() });


    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const hoy = moment();

    // 📌 Manejar contrato seguro
    let diasRestantesContrato = null;
    let fechaFinContrato = null;
    let contratoFirmado = false;

    if (usuario.contrato?.fechaFin) {
      fechaFinContrato = moment(usuario.contrato.fechaFin);
      diasRestantesContrato = fechaFinContrato.diff(hoy, 'days');
      contratoFirmado = usuario.contrato.firmado ?? false;
    }

    // 📌 Manejar tarjeta de salud seguro
    let tarjetaSaludVencida = null;
    let mesesRestantesTarjeta = null;

    if (usuario.tarjetaSalud?.fechaEmision) {
      const fechaTarjeta = moment(usuario.tarjetaSalud.fechaEmision);
      tarjetaSaludVencida = hoy.diff(fechaTarjeta, 'months') >= 6;
      mesesRestantesTarjeta = tarjetaSaludVencida
        ? 0
        : 6 - hoy.diff(fechaTarjeta, 'months');
    }

    // 📌 Respuesta final
    return res.json({
      nombreCompleto: usuario.nombreCompleto || "No disponible",
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
    console.error('Error al obtener datos del usuario', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
