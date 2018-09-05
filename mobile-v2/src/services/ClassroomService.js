import firebase from 'nativescript-plugin-firebase'
import storeConf from '../store';

export default {
    getCurrentUser() {
    
        firebase.getCurrentUser().then( 
        
        function (user) {  
          console.log("getting user")               
          var path = "/Users/"+user.uid+"/Classes";
          var onValueEvent = function (result) {
            if (result.error) {
              console.log(result.error)
            } else {
              if (result.value == null){
                alert("no classes!")
              }
              else {
                const obj = result.value;
                const classrooms = Object.keys(obj || {}).map(key => ({
                  id: key,
                  ClassName: obj[key].ClassName
                }));
                console.log(classrooms)
                //this is broken
                storeConf.mutations.setClassrooms(classrooms)
                
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

