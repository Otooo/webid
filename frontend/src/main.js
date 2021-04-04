import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

// configure helpers plugin
import helpers from '@/helpers/helper';
const helpersPlugin = {
  install (Vue) {
    Vue.prototype.$helpers = helpers;
  }
};

// axios 
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main';

// router setup
import routes from './routes/routes';

import './registerServiceWorker';
// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
Vue.use(helpersPlugin);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash};
    } else {
      return { x: 0, y: 0 };
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
});

// middleware
axios.interceptors.response.use(
  (response) => {
    return response;
  }, 
  (error) => {
    if (401 === error.response.status) {
      localStorage.removeItem('token');
      
      if (error.response.config.url != '/login')
        router.push('/');
    }
    return Promise.reject(error.response.data.error || error);
  }
);
