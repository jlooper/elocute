<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
	name: 'auth',
	mounted() {
		const uiConfig = {
			signInSuccessUrl: 'home',
			signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
			credentialHelper: firebaseui.auth.CredentialHelper.NONE,
		};
		if (firebaseui.auth.AuthUI.getInstance()) {
			const ui = firebaseui.auth.AuthUI.getInstance();
			ui.start('#firebaseui-auth-container', uiConfig);
		} else {
			const ui = new firebaseui.auth.AuthUI(firebase.auth());
			ui.start('#firebaseui-auth-container', uiConfig);
		}
	},
};
</script>