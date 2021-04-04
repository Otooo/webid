import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async index() {
    return axios.get('/auctions', { headers: headers() })
    .then((response) => response.data);
  },
  
};
