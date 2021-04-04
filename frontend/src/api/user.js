import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async profile() {
    return axios.get('/profile', { headers: headers() })
    .then((response) => response.data);
  },
  
};
