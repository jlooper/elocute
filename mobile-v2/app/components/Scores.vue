<template>
<Page ref="page" :class="pageClasses" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <StackLayout>
    <StackLayout class="action-bar">
      <Label class="text-center" text="Welcome to Elocute!"></Label>
    </StackLayout>

    <Image src="~/assets/images/header.png"/>

    <ScrollView>

    </ScrollView>

</StackLayout>
</Page>
</template>
<script>
export default {
  name: 'home'
}
</script>

<style>
.btn {
    color: #F3F3F3;
    font-family: "Quicksand";
    font-size: 20;
}

.start {
    background-color: #66A59A;
}

.stop {
    background-color: #90D2C5;
}

.score {
    background-color: #F5D1E9;
    color: rgb(114, 113, 113);
}

.card {
   background-color: #FFF;
   border-radius: 3;
   margin: 10;
   padding: 5;
   height: 100%;
}

Label {
    color: #131426;
}

.action-bar {
    background-color: #90D2C5;
    color: #131426;
    font-weight: bold;
    font-size: 20;
    font-family: "Quicksand";
    height: 30;
    padding-top: 10;
}

.shaded {
    padding: 10;
    border-radius: 5;
    border-color: #F3F3F3;
    background-color: #F3F3F3;
    height: 100;
}

.transcription {
    margin: 10 0;
    padding: 10;
    border-radius: 5;
    border-color: #F3F3F3;
    background-color: #F3F3F3;
    font-size: 25;
}

.instruction {
    font-size: 25;
    font-family: "Quicksand";
    text-align: center;
}
</style>
