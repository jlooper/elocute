import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import firebase from 'nativescript-plugin-firebase'

Vue.use(Vuex);

  const state = {
    user: null,
    message: null,
    info: null,
    student: null,
    classrooms: [],
    assignments: [],
    activeClassroom: null,
    activeAssignment: null,
  }

  const getters = {
    classroom: state => {
      return state.classrooms.find(classroom => classroom.id === state.activeClassroom);
    },
    assignment: state => {
      return state.assignments.find(assignment => assignment.id === state.activeAssignment);
    },
  }

  const mutations = {
    setUser: (state, user) => {
      state.user = user; 
    },
    setActiveClassroom: (state, id) => {
      state.activeClassroom = id;
    },
    setActiveAssignment: (state, id) => {
      state.activeAssignment = id;
    },
    setStudent: (state, student) => {
      state.message = '';
      state.student = student;
    },
    setClassrooms: (state, classrooms) => {
      state.classrooms = classrooms;
    },
    setAssignments: (state, assignments) => {
      state.assignments = assignments;
    },
    setMessage: (state, message) => {
      state.message = message;
    },
    setInfo: (state, info) => {
      state.info = info;
      //timeout the view
      setTimeout(function() {
        state.info = '';
      }, 2000);
    },
  }

  const actions = {
    fetchClassrooms: ({ state, commit }) => {
      firebase.getCurrentUser().then(        
        function (user) {          
          var path = "/Users/"+user.uid+"/Classes";
          var onValueEvent = function (result) {
            if (result.error) {
              console.log(result.error)
            } else {
              console.log(JSON.stringify(result.value));
              console.table(result.value)
              const obj = result.value;
              const classrooms = Object.keys(obj || {}).map(key => ({
                id: key,
                ClassName: obj[key].ClassName
              }));
              commit('setClassrooms', classrooms);
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
    },
    fetchAssignments ({ commit }, id) { 
      
      var onQueryEvent = function(result) {
        if (result.error) {
          console.log(result.error)
        } else {
          const obj = result.value;
          const assignments = Object.keys(obj || {}).map(key => ({
            id: key,
            Title: obj[key].Title,
            Text: obj[key].Text,
            Language: obj[key].Language
          }));
          commit('setAssignments', assignments);
        }
    };

    firebase.query(
        onQueryEvent,
        "/Assignments",
        {
          singleEvent: true,
          orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: 'ClassId'
          },
          range: {
            type: firebase.QueryRangeType.EQUAL_TO,
            value: id
          }         
        }
    );
      },
    
    updateUser({ commit }, payload){
      firebase.update(
        '/Users/'+payload.uid,
        {
            DisplayName: payload.email,
            Email: payload.name,
            id: payload.uid,
            updateTs: firebase.ServerValue.TIMESTAMP
        }).then(
        () => {
          //commit('setUser', payload);
        },
        error => {
          console.log("firebase.setValue error: " + error);
        }
    );
    },
    fetchCurrentUser({commit}){
      firebase.getCurrentUser().then(
        function (user) {
          commit('setUser', user);
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
      );
    }
  }

const storeConf = {
    state,
    getters,
    mutations,
    actions
}

export default storeConf
