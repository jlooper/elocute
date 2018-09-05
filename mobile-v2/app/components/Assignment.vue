<template>
    <Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout class="container">
            <EloActionBar text="My Assignments"/>
            <Image src="~/assets/images/header.png"/>


            <StackLayout class="card">
                <Label class="instruction"
                       textWrap="true"
                       text="Press the 'start' button, then read this text aloud, slowly and clearly"/>

                <ScrollView height="20%" class="transcription">
                    <Label v-if="assignment" verticalAlignment="top" horizontalAlignment="left" textWrap="true" :text="assignment.Text"/>
                </ScrollView>

                <GridLayout columns="*,*" rows="auto">
                    <Button col="0" row="0" class="btn start" @tap="startListening()" text="Start" />
                    <Button col="1" row="0" class="btn stop" @tap="stopListening()" text="Stop" />
                </GridLayout>

                <ActivityIndicator :busy="isSpeaking" />

                <ScrollView height="20%" class="transcription">
                    <Label ref="transcriptionLbl" verticalAlignment="top" horizontalAlignment="left" textWrap="true" />
                </ScrollView>
                <Button class="btn stop" @tap="getScore()" text="Get my Score" />
            </StackLayout>
        </StackLayout>
    </Page>
</template>
<script>
  import {mapState, mapGetters} from 'vuex';
  import {
    SpeechRecognition,
  } from "nativescript-speech-recognition";
  import EloActionBar from "./EloActionBar";

  export default {
    name: 'assignment',
    components: {EloActionBar},
    props: ['id'],
    data: () => ({
      isSpeaking: false,
      speechRecognition: new SpeechRecognition()
    }),
    computed: {
      ...mapState(['user', 'activeClassroom']),
      ...mapGetters(['assignment'])
    },
    watch: {
      'this.id': {
        handler(id) {
          this.$store.commit('setActiveAssignment', this.id)
        },
        immediate: true
      }
    },
    mounted() {
      this.speechRecognition.requestPermission().then((granted) => {
        if (!granted) {
          alert("It seems that you haven't enabled the microphone. Please visit your app settings and let this app listen to your voice!")
        }
      });
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.speechRecognition.available().then(
          function (available) {
          });
      },
      requestPermission() {
        this.speechRecognition.requestPermission().then((granted) => {
        })
      },
      similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
          longer = s2;
          shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
          return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
      },
      editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
          var lastValue = i;
          for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
              costs[j] = j;
            else {
              if (j > 0) {
                var newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1))
                  newValue = Math.min(Math.min(newValue, lastValue),
                    costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
              }
            }
          }
          if (i > 0)
            costs[s2.length] = lastValue;
        }
        return costs[s2.length];
      },
      startListening() {
        this.isSpeaking = true;
        this.speechRecognition.startListening(
          {
            onResult: (transcription) => {
              this.$refs.transcriptionLbl.nativeView.text = transcription.text;
            },
            returnPartialResults: true,
            locale: this.assignment.Language
          }
        ).then((started) => {
        }, (errorMessage) => {
          console.log(`Error while trying to start listening: ${errorMessage}`);
        });
      },
      stopListening() {
        this.speechRecognition.stopListening().then(() => {
          this.isSpeaking = false;
        })
      },
      getScore() {
        this.stopListening();
        let score = this.similarity(this.assignment.Text, this.$refs.transcriptionLbl.nativeView.text);
        alert("Score: " + Math.round(score * 100) + ' %');
      }
    }
  }
</script>

<style>
    .btn {
        font-family: "Quicksand";
        font-size: 20;
        border-radius: 5;
        color: #000000;
    }

    .start {
        background-color: #66A59A;
        margin: 5;
    }

    .stop {
        background-color: #90D2C5;
        margin: 5
    }

    .transcription {
        font-family: "Quicksand";
        margin: 5;
        border-radius: 5;
        height: 100%;
        border-color: #F3F3F3;
        background-color: #F3F3F3;
        font-size: 15;
    }

    .instruction {
        text-align: center;
    }
</style>
