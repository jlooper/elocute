<template>
    <GridLayout class="action-bar" rows="*" columns="20,2*,20">
        <Label v-if="back" col="0" row="0" class="fa" @tap="$navigateBack()" :text="'fa-chevron-left' | fonticon"/>
        <Label col="1" row="0" class="header" :text="text"/>
        <Label col="2" row="0" class="fa" @tap="$authService.logout()" :text="'fa-sign-out' | fonticon"/>
    </GridLayout>
</template>

<script>
  export default {
    props: {
      text: {},
      back: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
