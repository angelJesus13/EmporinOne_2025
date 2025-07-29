import Solicitud from '../models/solicitud.js'
import cron from 'node-cron';

cron.schedule('59 23 * * *', async () => {
    try {
        const resultado = await Solicitud.deleteMany({ estado: 'Finalizado' });
        console.log('Solicitudes eliminadas')
    } catch (error) {
        console.error('Error al limpiar solicitudes:', error);   
    }
})

export const crearSolicitud = async (req,res)=>{
    try {
        const nuevaSolicitud = new Solicitud(req.body);
        await nuevaSolicitud.save()
        res.status(201).json(nuevaSolicitud);
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.status(400).json({ error: 'Error al crear solicitud', detalle: error.message });
    }
}

export const obtenerSolicitudes = async (req,res)=>{
    try {
        const solicitudes = await Solicitud.find().populate('tramiteId','nombreTramite categoria');
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener solicitudes' });
    }
}

export const updateEstadoSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const solicitud = await Solicitud.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );
        if(!solicitud) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }
        res.json(solicitud);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar estado de la solicitud' });
    }
}