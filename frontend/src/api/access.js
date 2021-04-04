import axios from 'axios';

export default {
  async login(credentials) {
    return axios.post(process.env.VUE_APP_API_LOGIN_URL, credentials)
      .then((response) => response);
  }
};
