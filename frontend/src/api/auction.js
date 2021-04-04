import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async index({ name, description }) {
    return axios.get('/auctions', {
      params: {
        name,
        description
      },
      headers: headers()
    })
    .then((response) => response.data.data);
  },

  show(id) {
    return axios.get(`/auctions/${id}`, {
      headers: headers()
    })
    .then((response) => response.data.data);
  },

  update(id, changes) {
    return axios.put(`/auctions/${id}`, { ...changes }, {
      headers: headers()
    })
    .then((response) => response.data);
  },

  store({ item, start_bid, closed_at }) {
    return axios.post('/auctions', { item, start_bid, closed_at }, {
      headers: headers()
    })
    .then((response) => response.data);
  }
  
};
