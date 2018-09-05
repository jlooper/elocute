// import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'
import firebase from 'nativescript-plugin-firebase'

export default class AuthService extends BackendService {

  getMessage() {
    firebase.addOnMessageReceivedCallback(function (data) {
      alert(JSON.stringify(data));
    })
  }

  async login(user) {
    const result = await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    })
    BackendService.token = result.uid;
    return JSON.stringify(result);
  }

  async register(user) {
    const result = await firebase.createUser({
      email: user.email,
      password: user.password
    })
    return JSON.stringify(result);
  }

  async resetPassword(email) {
    const result = await firebase.resetPassword({
      email: email
    })
    return JSON.stringify(result);
  }

  async logout() {
    BackendService.token = "";
    return firebase.logout();
  }


}
