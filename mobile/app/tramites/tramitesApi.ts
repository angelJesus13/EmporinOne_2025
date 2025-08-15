import axios from 'axios';

const API = axios.create({
    baseURL:'http://192.168.100.19:3001'
})

export const fetchTramites = () => API.get('/tramites')

export const fetchTramiteById = (id: string) => API.get(`/tramites/${id}`)

export const crearSolicitud = (datos:{
    colaborador: string;
    nombre: string;
    correo: string;
    mensaje: string;
    tramiteId: string;
    usuarioId: string;
})  => API.post('/solicitudes', datos);