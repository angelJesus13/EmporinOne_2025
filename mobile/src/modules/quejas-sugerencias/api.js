import axios from 'axios';

const API = axios.create({
    baseURL: 'http://10.0.25.134:3001/api',
})
export const fetchTramites = () => API.get('/tramites');

export default API;