import axios from 'axios';

export const fetchTramites = async () => {
  return await axios.get('http://192.168.100.17:3001/tramites');
};