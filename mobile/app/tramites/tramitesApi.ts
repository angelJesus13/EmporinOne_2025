import axios from 'axios';

const API = axios.create({
    baseURL:'http://192.168.100.17:3001'
})

export const fetchTramites = () => API.get('/tramites')

export const fetchTramiteById = (id: string) => API.get(`/tramites/${id}`)

export const crearSolicitud = (datos:{
    colaborador: string;
    nombre: string;
    correo: string;
    mensaje: string;
    tramiteId: string;
})  => API.post('/solicitudes', datos);