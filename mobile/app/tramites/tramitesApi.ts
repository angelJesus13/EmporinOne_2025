import axios from 'axios';

export const fetchTramites = async () => {
  return await axios.get('http://10.7.64.153:3001/tramites');
};