<template>
<Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <StackLayout>
    <GridLayout class="action-bar" rows="*" columns="20,2*,20">
      <Label col="0" row="0" class="fa" @tap="goBack()" :text="'fa-arrow-left' | fonticon" />
      <Label col="1" row="0" class="header" text="My Assignments"></Label>
      <Label col="2" row="0" class="fa" @tap="logout()" :text="'fa-sign-out' | fonticon" />
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
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'assignments',
  props: ['id'],
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
        this.$changeRoute(this.$routes.assignment, { context: { propsData: { id: id } } })
    },
    logout() {
        this.$firebaseService.logout()
        this.$changeRoute(this.$routes.login)
    },
    goBack() {
        this.$navigateBack()
    }
  }
  
}
</script>
