import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import firebase from 'nativescript-plugin-firebase'
import router from './router/routes'
Vue.use(Vuex)

//Vue.config.console.silent();

import * as platformModule from 'tns-core-modules/platform'
import BackendService from './services/BackendService'
import { setStatusBarColors } from './utils/statusBar'
import './app.css'

//store
import storeConf from './store/store.js'
const store = new Vuex.Store(storeConf);
Vue.prototype.$store = store;

global.process = { env: { } } // hack! a build process should replace process.env's with static strings.
const backendService = new BackendService()
setStatusBarColors()

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
 
new Vue({
  router,
  store,
  computed: {
    pageClasses: function () {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': platformModule.isIOS,
        'platform-android': platformModule.isAndroid
      }
    }
  },

  template: `
    <page ref="page" :class="pageClasses">
      <router-view></router-view>
    </page>
    `,

  methods: {
  },

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
