<template>
<Page ref="page" :class="pageClasses" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <GridLayout class='login'>
    
    <LoginInitial ref="loginInitial" @login="showMainContent()" :visible="state === 'initial'"></LoginInitial>
    <LoginMain ref="loginMain" :visible="state === 'main'"></LoginMain>

    <AbsoluteLayout marginTop="-340" ref="logoContainer" class="logo-container">
      <Image translateY="0" src="res://seal" stretch="none"/>
    </AbsoluteLayout>

  </GridLayout>
</Page>
</template>
<script>
import * as platformModule from 'tns-core-modules/platform'
import LoginInitial from './LoginInitial.vue'
import LoginMain from './LoginMain.vue'
import * as enums from 'ui/enums'
export default {
  components: {
    LoginInitial,
    LoginMain
  },
  data() {
    return {
      state: 'initial'
    }
  },
  computed: {
    pageClasses: function () {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': platformModule.isIOS,
        'platform-android': platformModule.isAndroid
      }
    }
  },
  methods: {
    showMainContent: function() {
      this.$refs.logoContainer.nativeView
        .animate({
          translate: { x: 0, y: platformModule.isAndroid ? -70 : -50 },
          duration: 500,
          curve: enums.AnimationCurve.easeIn })
        .then(() => {
          this.state = 'main'
        })
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.login {
  .logo-container {
    horizontal-align: center;
    height: 80;
  }
}
</style>