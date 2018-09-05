<template>
    <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <StackLayout>
        <GridLayout class="action-bar" rows="*" columns="3*,auto">
            <Label col="0" row="0" class="header" text="Welcome to Elocute!"></Label>
            <Label col="1" row="0" class="fa" horizontalAlignment="right" @tap="logout()" :text="'fa-sign-out' | fonticon" />
        </GridLayout>
        
        <Image src="~/images/header"/>
            
        <StackLayout class="container">
            <ScrollView style="height: 100%">
                <StackLayout>
                    <StackLayout class="card" v-for="item in classrooms" v-bind:key="item.id" @tap="getAssignments(item.id)">
                        <Label :text="item.ClassName"></Label>
                    </StackLayout>                
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </StackLayout>
    </Page>
</template>
<script>

import { mapState, mapActions } from 'vuex';
import Assignments from './Assignments'

export default {
  name: 'home',
  computed: {
        ...mapState(['classrooms'])
  },
  created () {
      this.init();
  },  
  methods: {
      ...mapActions(['fetchClassrooms']),
    init() {
        this.fetchClassrooms();
    },
    getAssignments(id) {
        this.$navigateTo(Assignments, { context: { propsData: { id: id } } })
    },
    logout() {
        this.$authService.logout()
        this.$changeRoute(this.$routes.login)
    }
  }
  
}
</script>
