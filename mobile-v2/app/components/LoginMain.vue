<template>
  <StackLayout ref="mainContainer" class="main-container" :visibility="visible?'visible':'collapse'">
    <Label class="main-label" text="Elocute" :color="isLoggingIn? 'black' : 'white'"></Label>

    <GridLayout ref="formControls" class="form-controls" rows="auto, auto" translateY="50">
      <TextField
        hint="Email Address"
        keyboardType="email"
        returnKeyType="next"
        @returnPress="focusPassword()"
        v-model="user.email"
        :iEnabled="!isAuthenticating"
        autocorrect="false"
        autocapitalizationType="none"
        :class="{ light: !isLoggingIn}"
        row="0"></TextField>
      <TextField ref="password"
        hint="Password"
        secure="true"
        returnKeyType="done"
        @returnPress="submit()"
        v-model="user.password"
        :isEnabled="!isAuthenticating"
        :class="{ light: !isLoggingIn }"
        row="1"></TextField>

      <ActivityIndicator :busy="isAuthenticating" rowSpan="2"></ActivityIndicator>
    </GridLayout>

    <Button
      :text="isLoggingIn ? 'Login' : 'Sign up'"
      :isEnabled="!isAuthenticating"
      class="submit-button"
      @tap="submit()"></Button>

    <Label
      class="forgot-password-label"
      text="Forgot password?"
      @tap="forgotPassword()"
      :opacity="isLoggingIn ? 1 : 0"></Label>

    <StackLayout ref="signUpStack" class="sign-up-stack" @tap="toggleDisplay()" translateY="50">
      <Label :text="isLoggingIn ? 'Sign up here' : 'Back to login'"></Label>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { Animation } from 'ui/animation'
import { prompt } from "ui/dialogs"
import { Color } from 'tns-core-modules/color'
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity'
import User from '../models/User'
import alert from '../utils/alert'

export default {
  name: 'login-main',
  props: {
    visible: Boolean
  },
  data() {
    return {
      isLoggingIn: true,
      isAuthenticating: false,
      user: new User()
    }
  },
  watch: {
    visible: function(val) {
      // when element turns visible, start animations
      if (val) {
        const animations = []
        animations.push({ target: this.$refs.mainContainer.nativeView, opacity: 1, duration: 500 })
        // Slide up the form controls and sign up container.
        animations.push({ target: this.$refs.signUpStack.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 })
        animations.push({ target: this.$refs.formControls.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 })
        // Kick off the animation queue
        new Animation(animations, false).play()
      }
    }
  },
  methods: {
    toggleDisplay() {
      this.isLoggingIn = !this.isLoggingIn;
      let mainContainer = this.$refs.mainContainer.nativeView
      mainContainer.animate({
          backgroundColor: this.isLoggingIn ? new Color("#F3F3F3") : new Color("#131426"),
          duration: 200
      });
    },
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    submit() {
      this.isAuthenticating = true;
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.signUp();
      }
    },
    navigate() {
      this.$changeRoute(this.$routes.home)
    },
    login() {
      if (getConnectionType() === connectionType.none) {
        alert("Elocute requires an internet connection to log in.")
        return;
      }
      return this.$authService
        .login(this.user)
        .then(() => {
          this.isAuthenticating = false;
          this.$changeRoute('home')
        })
        .catch((error) => {
          console.error(error)
          alert("Unfortunately we could not find your account.")
          this.isAuthenticating = false;
        });
    },
    signUp() {
      if (getConnectionType() === connectionType.none) {
        alert("Elocute requires an internet connection to register.")
        return;
      }
      this.$authService
        .register(this.user)
        .then(() => {
          alert("Your account was successfully created.")
          this.isAuthenticating = false;
          this.toggleDisplay();
        })
        .catch(error => {
          // TODO: Verify if this works
          alert(error)
          this.isAuthenticating = false;
        });
    },
    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message: "Enter the email address you used to register for Elocute to reset your password.",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then((data) => {
        if (data.result) {
          this.isAuthenticating = true
          this.$authService
            .resetPassword(data.text.trim())
            .then(() => {
              this.isAuthenticating = false
              alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.")
            })
            .catch((error) => {
              this.isAuthenticating = false
              console.log('Error resetting password: ' + error)
              alert("Unfortunately, an error occurred resetting your password.");
            })
        }
      });
    }
  },
  mounted() {
    console.log('LoginOrSignup mounted')
  }
}
</script>

<style lang="scss">
.login {
  .main-container {
    height: 425;
    margin-left: 30;
    margin-right: 30;
    border-radius:10;
    background-color: #F3F3F3;
  }
  .main-label {
    horizontal-align: center;
    color: #131426;
  }
  .form-controls,
  .sign-up-stack {
    opacity: 0;
  }
  Image {
    margin-top: 5;
    margin-bottom: 20;
  }
  Button,
  TextField {
    margin-left: 16;
    margin-right: 16;
    margin-bottom: 10;
    border-radius: 2;
  }
  TextField {
    color: #131426;
    placeholder-color: #ACA6A7;
    margin-bottom: 10;
    &.light {
      color: #C4AFB4;
      placeholder-color: #C4AFB4;
    }
  }
  .submit-button {
    background-color: #F5D1E9;
    color: #131426;
    margin-top: 15;
    border-radius: 10;
  }
  .forgot-password-label {
    font-size: 13;
    margin-left: 20;
    margin-bottom: 45;
    color: #131426;
  }
  .sign-up-stack {
    background-color: #66A59A;
    label {
      width: 100%;
      color: white;
      horizontal-align: center;
      text-align: center;
      font-size: 15;
      height: 50;
    }
  }
}
.platform-ios .login {
  .main-container {
    width: 300;
  }
  .main-label {
    color: #131426;
    font-size: 32;
    margin-top: 45;
    margin-bottom: 52;
    letter-spacing: 0.2;
  }
  TextField {
    border-width: 1;
    border-color: #131426;
    margin-bottom: 20;
    &.light {
      border-color: #C4AFB4;
    }
  }
  .submit-button {
    height: 40;
  }
}
.platform-android .login {
  .main-container {
    width: 275;
    height: 394;
  }
  .main-label {
    font-size: 28;
    margin-top: 42;
    margin-bottom: 32;
    letter-spacing: 0.3;
  }
  .sign-up-stack label {
    margin-top: 15;
    text-transform: uppercase;
  }
  .forgot-password-label {
    font-size: 13;
    text-transform: uppercase;
  }
}
</style>
