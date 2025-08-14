import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';

const RH_ADMIN_CORREOS = [
  'cancun.capacitacion@hotelesemporio.com',
  'rh.manager@hotelesemporio.com',
  'recursos.humanos@hotelesemporio.com'
];

const SUPER_ADMIN_CORREOS = [
  'mambario@grupodiestra.com',
  'admin.global@grupodiestra.com',
  'root@grupodiestra.com'
];

export const register = async (req, res) => {
  try {
    const {
      nombreCompleto,
      numeroColaborador,
      correo,
      contraseña,
      firebaseToken,
      preguntaSeguridad,
      respuestaSeguridad
    } = req.body;

    if (!nombreCompleto || !numeroColaborador || !contraseña || !firebaseToken || !preguntaSeguridad || !respuestaSeguridad) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    const existe = await Usuario.findOne({ numeroColaborador });
    if (existe) return res.status(400).json({ mensaje: 'Número de colaborador ya registrado' });

    const hashedPass = await bcrypt.hash(contraseña, 10);
    const hashedRespuesta = await bcrypt.hash(respuestaSeguridad.trim().toLowerCase(), 10);

    let rol = 'colaborador';
    if (correo) {
      const correoLower = correo.toLowerCase();
      if (SUPER_ADMIN_CORREOS.includes(correoLower)) rol = 'super_admin';
      else if (RH_ADMIN_CORREOS.includes(correoLower)) rol = 'rh_admin';
    }

    const nuevoUsuario = new Usuario({
      nombreCompleto,
      numeroColaborador,
      correo,
      contraseña: hashedPass,
      firebaseToken,
      preguntaSeguridad,
      respuestaSeguridad: hashedRespuesta,
      rol
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', rol });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  const { identificador, contraseña } = req.body;

  if (!identificador || !contraseña) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  try {
    const usuario = await Usuario.findOne({
      $or: [
        { numeroColaborador: identificador },
        { correo: identificador.toLowerCase() }
      ]
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const validPass = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!validPass) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombreCompleto,
        rol: usuario.rol,
        numeroColaborador: usuario.numeroColaborador,
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
