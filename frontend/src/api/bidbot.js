import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async show() {
    return axios.get('/bidbots', {
      headers: headers()
    })
    .then((response) => response.data.data);
  },

  async update(changes) {
    return axios.post('/bidbots', { ...changes }, {
      headers: headers()
    })
    .then((response) => response.data);
  }
};
