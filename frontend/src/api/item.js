import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async index({ name, description }) {
    return axios.get('/items', {
      params: {
        name,
        description
      },
      headers: headers()
    })
    .then((response) => response.data.data);
  },

  async store(item) {
    return axios.post('/items', item, {
      headers: headers()
    })
    .then((response) => response.data);
  }
  
};
