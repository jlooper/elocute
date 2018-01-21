import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    message: null,
    info: null,
    student: null,
    students: [],
    classrooms: [],
    assignments: [],
    activeClassroom: null,
    activeAssignment: null,
  },
  getters: {
    classroom: state => {
      return state.classrooms.find(classroom => classroom.id === state.activeClassroom);
    },
    assignment: state => {
      return state.assignments.find(assignment => assignment.id === state.activeAssignment);
    },
  },
  mutations: {
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
    setStudents: (state, students) => {
      state.students = students;
    },
    clearStudent: state => {
      state.student = null;
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
  },
  actions: {
    fetchClassrooms: ({ state, commit }) => {
      firebase
        .database()
        .ref('Classrooms')
        .orderByChild('TeacherId')
        .equalTo(state.user.uid)
        .once('value', function(data) {
          const obj = data.val();
          const classrooms = Object.keys(obj || {}).map(key => ({
            id: key,
            ClassName: obj[key].ClassName,
          }));
          commit('setClassrooms', classrooms);
        });
    },
    fetchStudents({ commit }, classId) {
      firebase
        .database()
        .ref('Classrooms/' + classId + '/Students')
        .on('value', function(data) {
          const obj = data.val();
          const students = Object.keys(obj || {}).map(key => ({
            id: key,
            StudentName: obj[key].DisplayName,
          }));
          commit('setStudents', students);
        });
    },
    fetchAssignments({ commit }, classId) {
      firebase
        .database()
        .ref('Assignments')
        .orderByChild('ClassId')
        .equalTo(classId)
        .once('value', function(data) {
          const obj = data.val();
          const assignments = Object.keys(obj || {}).map(key => ({
            id: key,
            Title: obj[key].Title,
            Text: obj[key].Text,
          }));
          commit('setAssignments', assignments);
        });
    },
    createClassroom({ dispatch }, payload) {
      return firebase
        .database()
        .ref('Classrooms')
        .push(payload)
        .then(data => {
          dispatch('fetchClassrooms');
        });
    },
    createAssignment({ dispatch }, payload) {
      return firebase
        .database()
        .ref('Assignments')
        .push(payload)
        .then(data => {
          dispatch('fetchAssignments', payload.ClassId);
        });
    },
    findUser({ commit }, payload) {
      return firebase
        .database()
        .ref('Users')
        .orderByChild('Email')
        .equalTo(payload.Email)
        .once('value', function(data) {
          if (data.val()) {
            const obj = data.val();
            const student = Object.keys(obj || {}).map(key => ({
              id: key,
              DisplayName: obj[key].DisplayName,
              Email: obj[key].Email,
            }));
            commit('setStudent', student[0]);
          } else {
            commit('setMessage', "Sorry, we couldn't find this student");
          }
        });
    },
    updateUser({ dispatch }, payload) {
      return firebase
        .database()
        .ref('Users/' + payload.id)
        .update(payload)
        .then(data => {
          dispatch('fetchStudents');
        });
    },
    associateClassToStudent(context, payload) {
      return firebase
        .database()
        .ref('Users/' + payload.studentId + '/Classes/' + payload.classId)
        .update({
          ClassName: payload.className,
        });
    },
    associateStudentToClass({ commit, dispatch }, payload) {
      return firebase
        .database()
        .ref('Classrooms/' + payload.classId + '/Students/' + payload.studentId)
        .update({
          DisplayName: payload.studentName,
        })
        .then(commit('clearStudent'))
        .then(dispatch('fetchStudents', payload.classId));
    },
    addAssignmentToClass(context, payload) {
      return firebase
        .database()
        .ref('Classrooms/' + payload.classId + '/Assignments')
        .update({
          AssignmentName: payload.assignmentName,
          AssignmentContent: payload.assignmentContent,
        });
    },
  },
});
