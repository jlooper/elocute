<template>
    <v-card color="tile" tile class="pa-4" v-if="assignment">
        <h1>{{assignment.Title}}</h1>
        <p align="left">
        <pre>{{assignment.Text}}</pre>
        </p>
    </v-card>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapState(['user', 'activeClassroom']),
      ...mapGetters(['assignment'])
    },
    watch: {
      '$route.params.id': {
        handler(id) {
          this.$store.commit('setActiveAssignment', id)
        },
        immediate: true
      },
      '$route.params.classId': {
        handler(id) {
          this.$store.commit('setActiveClassroom', id)
        },
        immediate: true
      }
    },
    created() {
      this.init();
    },
    methods: {
      async init() {
        await this.$store.dispatch('fetchAssignments', this.activeClassroom);
      },
    }
  };
</script>

