import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async providers(cities_id, filter) {
    return axios.get('/provider', {
      params: {
        cities_id,
        filter
      },
      headers: headers()
    })
    .then((response) => response.data.providers);
  },
  
};
