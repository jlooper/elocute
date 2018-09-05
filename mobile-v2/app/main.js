import Vue from 'nativescript-vue';
import routes from './router';
import storeConf from './store';
import Vuex from 'vuex';
import firebase from 'nativescript-plugin-firebase'
import BackendService from './services/BackendService'
import AuthService from './services/AuthService'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon'

//import { setStatusBarColors } from './utils/statusBar'
const backendService = new BackendService()
const authService = new AuthService()

// export the store so we can use it in services
export const store = new Vuex.Store(storeConf)

Vue.prototype.$store = store;
Vue.prototype.$routes = routes;
Vue.prototype.$authService = authService
//route manually
Vue.prototype.$changeRoute = (to) => {
  Vue.navigateTo(routes[to])
}

//TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/font-awesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon)

Vue.use(Vuex)


firebase.init({
  onAuthStateChanged: data => { // optional
    console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (init's onAuthStateChanged callback)");
    if (data.loggedIn) {
      backendService.token = data.user.uid
      console.log(data.user.uid)
      store.commit('setUser', data.user)
      Vue.navigateTo(routes.home)
    }
    else {
      backendService.token = ""
      Vue.navigateTo(routes.login)
    }
  }
}).then(
  instance => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);

import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

  routes,

  store,

  render(h) {
    return h('frame', [
      h(backendService.isLoggedIn() ? routes.home : routes.login)
    ])
  },

  mounted() {

    // force first redirect
    /*if (backendService.isLoggedIn()) {
      router.push('/home')
    }
    else {
      router.push('/login')
    }*/

  }
}).$start()
