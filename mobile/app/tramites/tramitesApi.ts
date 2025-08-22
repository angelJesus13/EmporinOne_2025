import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'https://64b150907a04.ngrok-free.app';

const API = axios.create({
    baseURL: `http://${API_URL}:3001`,
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