import firebase from 'nativescript-plugin-firebase'
import store from '../store';

export default {
  getCurrentUser() {
    firebase.getCurrentUser().then(
      function (user) {
        console.log("getting user")
        var path = "/Users/" + user.uid + "/Classes";
        var onValueEvent = function (result) {
          if (result.error) {
            console.log(result.error)
          } else {
            if (result.value == null) {
              console.log("no classes!");
            } else {
              const obj = result.value;
              const classrooms = Object.keys(obj || {}).map(key => ({
                id: key,
                ClassName: obj[key].ClassName
              }));
              console.log(classrooms)
              store.commit('setClassrooms', classrooms)
              // storeConf.mutations.setClassrooms(classrooms)
            }
          }
        };

        firebase.addValueEventListener(onValueEvent, path).then(
          function (result) {
            that._listenerWrapper = result;
            console.log("firebase.addValueEventListener added");
          },
          function (error) {
            console.log("firebase.addValueEventListener error: " + error);
          }
        );
      }
    )
  }
}

