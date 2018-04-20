import Vue from 'nativescript-vue';
import routes from './router';
import storeConf from './store';
import Vuex from 'vuex';
import firebase from 'nativescript-plugin-firebase'
import BackendService from './services/BackendService'
import FirebaseService from './services/FirebaseService'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

import Home from './components/Home'
import Login from './components/Login'

//import { setStatusBarColors } from './utils/statusBar'
const backendService = new BackendService()
const firebaseService = new FirebaseService()
const store = new Vuex.Store(storeConf);

Vue.prototype.$store = store;
Vue.prototype.$routes = routes;
Vue.prototype.$firebaseService = firebaseService;
//route manually
Vue.prototype.$changeRoute = (to) => {
  Vue.navigateTo(routes[to])
  }

//TNSFontIcon.debug = true; 
TNSFontIcon.paths = {
  'fa': './font-awesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

Vue.use(Vuex)

firebase.init({
  onAuthStateChanged: data => { // optional
    console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (init's onAuthStateChanged callback)");
    if (data.loggedIn) {
      backendService.token = data.user.uid
      store.commit('setUser', data.user)
      Vue.navigateTo(Home)
    }
    else {
      backendService.token = ""
      Vue.navigateTo(Login)
    }
  },
  persist: false,
}).then(() => 
  (error) => console.log(`firebase.init error: ${error}`));
 

import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

  routes,

  store,

  render: h => h(backendService.isLoggedIn() ? Vue.navigateTo(Home) : Vue.navigateTo(Login)),

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
