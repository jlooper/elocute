<template>
<Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <StackLayout>
    <GridLayout class="action-bar" rows="*" columns="3*,20">
      <Label col="0" row="0" class="header" text="Welcome to Elocute!"></Label>
      <Image src="~/images/logout.png" class="header-icon" col="1" row="0" @tap="logout()"/>
    </GridLayout>
    <StackLayout class="container">
        <Image src="~/images/header"/>        
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

export default {
  name: 'home',
  computed: {
        ...mapState(['classrooms'])
  },
  data: () => ({
	item: {}
    }),
  created () {
      this.init();
  },
  
  methods: {
      ...mapActions(['fetchClassrooms']),
    init() {
        this.fetchClassrooms();
    },
    getAssignments(id) {
        this.$router.replace('/assignments/'+id)
    },
    logout() {
        this.$firebaseService.logout()
        this.$router.replace('/login')
    }
  }
  
}
</script>
