<template>
  <StackLayout ref="initialContainer" class="initial-container" v-bind:visibility="visible?'visible':'collapse'">
    <Label text="Elocute" class="initial-label"></Label>
    <StackLayout @tap="welcome()" class="initial-button">
      <Label text="Welcome" class="initial-button-label"></Label>
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  name: 'login-initial',
  props: {
    visible: Boolean
  },
  methods: {
    welcome: function() {
      // fadeout and notify parent element when finished
      this.$refs.initialContainer.nativeView.animate({
        opacity: 0,
        duration: 500
      }).then( () => {
        this.$emit('login');
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  .initial-container {
    margin-top: 250;
  }
  .initial-label {
    color: #66A59A;
    horizontal-align: center;
    margin-bottom: 80;
  }
  .initial-button {
    background-color: #F5D1E9;
    color: #66A59A;
    height: 45;
    width: 275;
    border-radius: 10;
    vertical-align: center;
  }
  .initial-button-label {
    horizontal-align: center;
    font-weight: bold;
  }
}
.platform-ios .login {
  .initial-label {
    font-size: 40;
    letter-spacing: 0.2;
  }
}
.platform-android .login {
  .initial-container {
    margin-top: 290;
  }
  .initial-label {
    font-size: 36;
    letter-spacing: 0.35;
  }
}
</style>