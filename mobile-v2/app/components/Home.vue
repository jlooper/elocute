<template>
    <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout class="container">
            <EloActionBar text="Welcome to Elocute!" :back="false"/>
            <Image src="~/assets/images/header.png"/>

            <ScrollView style="height: 100%">
                <StackLayout>
                    <StackLayout class="card"
                                 v-for="item in classrooms"
                                 :key="item.id"
                                 @tap="getAssignments(item.id)">
                        <Label :text="item.ClassName"></Label>
                    </StackLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>
<script>

  import {mapState, mapActions} from 'vuex';
  import Assignments from './Assignments'
  import EloActionBar from "./EloActionBar";

  export default {
    name: 'home',
    components: {EloActionBar},
    computed: {
      ...mapState(['classrooms'])
    },
    created() {
      this.fetchClassrooms();
    },
    methods: {
      ...mapActions(['fetchClassrooms']),
      getAssignments(id) {
        this.$navigateTo(Assignments, {context: {propsData: {id: id}}})
      },
    }

  }
</script>
