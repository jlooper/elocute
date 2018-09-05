<template>
    <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout class="container">
            <EloActionBar text="My Assignments"/>
            <Image src="~/assets/images/header.png"/>

            <ScrollView style="height: 100%">
                <StackLayout>
                    <StackLayout class="card"
                                 v-for="item in assignments"
                                 :key="item.id"
                                 @tap="getAssignment(item.id)">
                        <Label textWrap="true" :text="item.Title"/>
                    </StackLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>
<script>
  import {mapState, mapGetters} from 'vuex';
  import Assignment from './Assignment'
  import EloActionBar from "./EloActionBar";

  export default {
    name: 'assignments',
    components: {EloActionBar},
    props: ['id'],
    computed: {
      ...mapState(['classrooms', 'activeClassroom', 'assignments']),
      ...mapGetters(['classroom', 'assignment']),
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.$store.dispatch('fetchAssignments', this.id);
      },
      getAssignment(id) {
        this.$navigateTo(Assignment, {context: {propsData: {id: id}}})
      },
    }
  }
</script>
