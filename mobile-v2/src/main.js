import Vue from 'nativescript-vue';
import router from './router';
import storeConf from './store';
import Vuex from 'vuex';
import firebase from 'nativescript-plugin-firebase'
import BackendService from './services/BackendService'
import FirebaseService from './services/FirebaseService'

//import { setStatusBarColors } from './utils/statusBar'
const backendService = new BackendService()
const firebaseService = new FirebaseService()
const store = new Vuex.Store(storeConf);

Vue.prototype.$store = store;
Vue.prototype.$firebaseService = firebaseService;

Vue.use(Vuex)

firebase.init({
  onAuthStateChanged: data => { // optional
    console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (init's onAuthStateChanged callback)");
    if (data.loggedIn) {
      backendService.token = data.user.uid;
      store.commit('setUser', data.user)
      router.replace('/home')
    }
    else {
      backendService.token = ""
      router.replace('/login')
    }
  },
  persist: false,
}).then(() => 
  (error) => console.log(`firebase.init error: ${error}`));
 

import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

  router,

  store,

  mounted() {
    
    // force first redirect
    if (backendService.isLoggedIn()) {
      router.replace('/home')
    }
    else {
      router.replace('/login')
    }

  }
}).$start()
