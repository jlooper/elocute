import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'
import firebase from 'nativescript-plugin-firebase'

export default class FirebaseService extends BackendService{

  getMessage(){ 
    firebase.addOnMessageReceivedCallback(function (data ){
        alert(JSON.stringify(data));
    })
  }

  login(user) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    }).then((result) => {
      BackendService.token = result.uid;
      return JSON.stringify(result);
      }, (errorMessage) => {
        alert(errorMessage);
      })
  }

  register(user) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
          function (result) {
            return JSON.stringify(result);
          },
          function (errorMessage) {
            alert(errorMessage);
          }
      )
  }

  resetPassword(email) {
    return firebase.resetPassword({
      email: email
      }).then((result) => {
            alert(JSON.stringify(result));
          },
          function (errorMessage) {
            alert(errorMessage);
          }
      ).catch(this.handleErrors);
  }

  logout() {
    BackendService.token = "";
    firebase.logout();
  }  

}