<template>
    <v-container grid-list-md text-xs-center v-if="classroom">
        
            <v-flex>
                <h3>Add a Student to {{classroom.ClassName}}</h3>
                <p>This student is a currently registered member of Elocute. You can search for his or her email
                    address, and if his or her record exists, it will be added to your classroom.</p>
            </v-flex>

            <v-flex xs12 v-if="message">
                <v-alert color="error" icon="warning" value="true">
                     {{message}}
                </v-alert>              
            </v-flex>
            
            <v-flex xs12>
                <v-card tile color="tile" class="pa-4">
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-layout row>
                            <v-text-field
                                label="Student Email"
                                v-model="studentEmail"
                                :rules="studentEmailRules"
                                required
                            ></v-text-field>
                            <v-btn class="secondary"
                                @click="search"
                                :disabled="!valid"
                            >
                                Search for a Student
                            </v-btn>
                        </v-layout>
                    </v-form>
                </v-card>
            </v-flex>
            
            <v-flex xs12 v-if="student">
               <v-card color="primary" class="pa-3">
                   <v-layout row>
                        <h3>{{student.DisplayName}}</h3>
                        <v-btn class="secondary"
                            @click="add"
                        >
                            Add to Class
                        </v-btn>
                    </v-layout>
               </v-card>
            </v-flex>

            <v-flex xs12 v-if="students.length">
                
                <h3>Enrolled Students</h3>

                    <v-layout row wrap color="tile">
                        <v-flex xs4
                                v-for="item in students"
                                :key="item.id"
                        >
                            <v-card class="pa-2 info-card" color="accent">

                                
                                    <router-link class="white-link" :to="{
										name: 'StudentHome',
										params: { id: item.id }
							 			}">
                                         <h3 class="white-link">{{item.StudentName}}</h3>
                                    </router-link>

                            </v-card>
                        </v-flex>
                    </v-layout>
            </v-flex>

            <hr class="ma-4">

            <v-flex xs12 v-if="info">
                <v-alert color="info" icon="info" value="true">
                     {{info}}
                </v-alert>              
            </v-flex>

                <h3 class="pa-2">Add an Assignment</h3>

                <v-card tile color="tile" class="pa-4">
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field
                                label="Assignment Title"
                                v-model="assignmentTitle"
                                :rules="assignmentTitleRules"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Text"
                                v-model="assignmentText"
                                :rules="assignmentTextRules"
                                multi-line
                                required
                        ></v-text-field>
                        <v-btn class="secondary"
                               @click="create"
                               :disabled="!valid"
                        >
                            Create Assignment
                        </v-btn>
                    </v-form>
                </v-card>

                <v-flex xs12 v-if="assignments.length">

                <h3 class="pa-2">Assignments</h3>

                
                    <v-layout row wrap color="tile" class="pa-4">
                        <v-flex xs4
                                v-for="item in assignments"
                                :key="item.id"
                        >
                           <v-card class="pa-2 info-card" color="accent">

                                
                                    <router-link class="white-link" :to="{
										name: 'AssignmentHome',
										params: {
                                            id: item.id,
                                            classId: activeClassroom
                                        }
							 			}">
                                        <h3 class="white-link">{{item.Title}}</h3>
                                    </router-link>

                            </v-card>
                        </v-flex>
                    </v-layout>
                
            </v-flex>
       
    </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	computed: {
		...mapState(['user', 'student', 'students', 'classrooms', 'activeClassroom', 'assignments', 'message', 'info']),
		...mapGetters(['classroom', 'assignment']),
	},
	data: () => ({
		valid: true,
		item: {},
		studentEmail: '',
		studentEmailRules: [v => !!v || 'Student email address is required'],
		assignmentTitle: '',
		assignmentTitleRules: [v => !!v || 'Assignment Title is required'],
		assignmentText: '',
		assignmentTextRules: [v => !!v || 'Assignment Text is required'],
	}),
	watch: {
		'$route.params.id': {
			handler(id) {
				this.$store.commit('setActiveClassroom', id);
			},
			immediate: true,
		},
	},
	created() {
		this.init();
	},
	methods: {
		async init() {
			await this.$store.dispatch('fetchClassrooms');
			await this.$store.dispatch('fetchStudents', this.activeClassroom);
			await this.$store.dispatch('fetchAssignments', this.activeClassroom);
		},
		search() {
			this.$store.dispatch('findUser', {
				Email: this.studentEmail,
			});
		},
		async add() {
			let classId = this.classroom.id;
			let className = this.classroom.ClassName;
			let studentId = this.student.id;
			let studentName = this.student.DisplayName;
			await this.$store.dispatch('associateClassToStudent', {
				studentId: studentId,
				classId: classId,
				className: className,
			});
			await this.$store.dispatch('associateStudentToClass', {
				studentId: studentId,
				classId: classId,
				studentName: studentName,
			});
		},
		create() {
			this.$store
				.dispatch('createAssignment', {
					ClassId: this.activeClassroom,
					Title: this.assignmentTitle,
					Text: this.assignmentText,
				})
				.then(this.$store.commit('setInfo', 'Assignment added!'));
		},
	},
};
</script>

