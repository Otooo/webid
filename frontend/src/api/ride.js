import axios from 'axios';
import { headers } from '@/helpers/auth';

export default {
  async rides(cities_id, amount, filter) {
    return axios.get('/ride', {
      params: {
        cities_id,
        amount,
        filter
      },
      headers: headers()
    })
    .then((response) => response.data.rides);
  },
  
  async accumulatedMonth(cities_id, month, year) {
    return axios.get('/accumulated-month', {
      params: {
        cities_id,
        month,
        year
      },
      headers: headers()
    })
    .then((response) => response.data.accumulated_month);
  },
  
  async accumulatedMonthly(cities_id, year) {
    return axios.get('/accumulated-monthly', {
      params: {
        cities_id,
        year
      },
      headers: headers()
    })
    .then((response) => response.data.accumulated_monthly);
  },
};
