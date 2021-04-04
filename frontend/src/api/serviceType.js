import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async index(cities_id) {
    return axios.get('/service-type', {
      params: {
        cities_id
      },
      headers: headers()
    })
    .then((response) => response.data.service_types);
  },

  update (id, changes) {
    return axios.put(
      `/service-type/${id}`,
      changes,
      { headers: headers() })
      .then((response) => response.data.message);
  }

};
