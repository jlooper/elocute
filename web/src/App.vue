<template>
  <v-app id="app">

<v-navigation-drawer
    v-model="sideNav"
    enable-resize-watcher
    left
    absolute
    temporary
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon medium>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content color="accent">{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


  <v-toolbar color="primary">
    <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
    <router-link to="/"><img src="./assets/images/seal.png" height="50px"></router-link>
    <v-toolbar-title>EloCute: For Language Teachers and Students</v-toolbar-title>
    </v-toolbar>
    <v-container grid-list-md text-xs-center  class="pb-5">
    <v-layout row wrap>
      <v-flex xs12>
        <router-view/>
      </v-flex>
    </v-layout>
    </v-container>
    
  <v-footer fixed class="hidden-sm-and-down" color="accent">
    <v-container>
      <v-spacer></v-spacer>
      <h3>&copy; Ladeez First Media {{ new Date().getFullYear() }}</h3>
    </v-container>
  </v-footer>
  </v-app>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			sideNav: false,
			menuItems: [
				{ icon: 'home', title: 'Home', link: '/home' },
				{ icon: 'business', title: 'About', link: '/about' },
				{ icon: 'email', title: 'Contact Us', link: '/contact' },
			],
		};
	},
	methods: {},
	created() {},
};
</script>

<style lang="stylus">
@require './stylus/main';
</style>