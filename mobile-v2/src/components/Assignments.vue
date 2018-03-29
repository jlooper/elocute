<template>
<Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <StackLayout>
    <GridLayout class="action-bar" rows="*" columns="20,2*,20">
      <Image src="~/images/back.png" col="0" row="0" class="header-icon" @tap="goBack()"/>
      <Label col="1" row="0" class="header" text="My Assignments"></Label>
      <Image src="~/images/logout.png" class="header-icon" col="2" row="0" @tap="logout()"/>
    </GridLayout>
    <StackLayout class="container">
        <Image src="~/images/header"/>        
        <ScrollView style="height: 100%">
            <StackLayout>
                <StackLayout class="card" v-for="item in assignments" v-bind:key="item.id" @tap="getAssignment(item.id)">
                    <Label textWrap="true" :text="item.Title"></Label>
                </StackLayout>                
            </StackLayout>
        </ScrollView>
    </StackLayout>
</StackLayout>
</Page>
</template>
<script>
import Router from 'vue-router';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'assignments',
  computed: {
		...mapState(['classrooms', 'activeClassroom', 'assignments']),
		...mapGetters(['classroom', 'assignment']),
	},
  data: () => ({
	item: {}
    }),
  created () {
      this.init();
  },
  methods: {
    init() {
      this.$store.dispatch('fetchAssignments', this.$route.params.id);
    },
    getAssignment(id) {
        this.$router.push('/assignment/'+id)
    },
    logout() {
        this.$firebaseService.logout()
        this.$router.push('/login')
    },
    goBack() {
        this.$navigateBack()
    }
  }
  
}
</script>
