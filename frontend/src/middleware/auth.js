import { isSignedIn } from '@/helpers/auth';
import Vue from "vue";

export default function auth(to, _, next) {
  const logged = isSignedIn();

  if (!logged && to.name === 'login') {
    return next();
  } else if (!logged) {
    if(localStorage.getItem('expiration'));
      notifySessionExpired()
    localStorage.removeItem('expiration');
    localStorage.removeItem('token');
    return next('/login');
  } else if (to.name === 'login' && logged) {
    return next('/auctions')
  }
  
  return next();
}

export function notifySessionExpired(message='Reconnect to access the features!') {
  Vue.prototype.$notifications.notify({
    message: `<span>${message}</span>`,
    verticalAlign: 'top',
    horizontalAlign: 'center',
    icon: 'fa fa-exclamation-triangle',
    timeout: 4000,
    type: 'warning'
  });
}
