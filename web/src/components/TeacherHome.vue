<template>
    <v-container grid-list-md text-xs-center>
        <v-layout column>
            <v-flex xs1 offset-xs11>
                <v-btn color="secondary" @click="logOut">Logout</v-btn>
            </v-flex>
            
            <h1 text-xs-center>Welcome {{user.displayName}}</h1>
                    
            <v-flex xs12>
                <v-card tile color="tile" class="pa-4">
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-layout row>
                            <v-text-field
                                label="Classroom Name"
                                v-model="classroomName"
                                :rules="classroomNameRules"
                                :counter="20"
                                required
                            ></v-text-field>
                            <v-btn class="secondary"
                                @click="submit"
                                :disabled="!valid"
                            >
                                create a classroom
                            </v-btn>
                        </v-layout>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>

        <h3 class="pa-4" v-if="classrooms.length">My Classrooms</h3>

        
            <v-layout row wrap color="tile">
                <v-flex xs4
                        v-for="item in classrooms"
                        :key="item.id"
                >
                    <v-card class="pa-2 info-card" color="accent">
                        
                            <router-link class="white-link" :to="{
								name: 'ClassroomHome',
								params: { id: item.id }
							 }">
                                <h3 class="white-link">{{item.ClassName}}</h3>
                            </router-link>
                      
                    </v-card>
                    
                </v-flex>
            </v-layout>
       
    </v-container>
</template>

<script>
import firebase from 'firebase';
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState(['user', 'classrooms']),
	},
	data: () => ({
		valid: true,
		item: {},
		classroomName: '',
		classroomNameRules: [
			v => !!v || 'Classroom name is required',
			v => v.length <= 20 || 'Name must be fewer than 20 characters',
		],
	}),
	created() {
		this.fetchClassrooms().then(this.updateUser());
	},
	methods: {
		...mapActions(['fetchClassrooms']),
		logOut() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.replace('Auth');
				});
		},
		updateUser() {
			this.$store.dispatch('updateUser', {
				Email: this.user.email,
				DisplayName: this.user.displayName,
				id: this.user.uid,
			});
		},
		submit() {
			this.$store
				.dispatch('createClassroom', {
					ClassName: this.classroomName,
					TeacherId: this.user.uid,
				})
				.then(() => {
					// clear the form
					this.classroomName = '';
				});
		},
	},
};
</script>