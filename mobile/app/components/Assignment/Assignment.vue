<template>
<Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
  <StackLayout>
    <GridLayout class="action-bar" rows="*" columns="20,2*,20">
      <Image src="~/images/back.png" col="0" row="0" class="header-icon" @tap="goBack()"/>
      <Label col="1" row="0" class="header" :text="assignment.Title"></Label>
      <Image src="~/images/logout.png" class="header-icon" col="2" row="0" @tap="logout()"/>
    </GridLayout>
    <StackLayout class="container">
        <Image src="~/images/header.png"/>        
            <StackLayout class="card" height="100%">
                <Label class="instruction" textWrap="true" text="Press the 'start' button, then read this text aloud, slowly and clearly"></Label>
                <Button class="btn start" @tap="startListening()" text="Start"></Button>
                <ActivityIndicator :busy="isSpeaking" rowSpan="2"></ActivityIndicator>
                <ScrollView height="25%">
                    <Label verticalAlignment="top" horizontalAlignment="left" textWrap="true">
                        <FormattedString>
                            <Span class="transcription" :text="assignment.Text"></Span>
                        </FormattedString>
                    </Label>
                </ScrollView>
                <Button class="btn stop" @tap="stopListening()" text="Stop"></Button>
                <ScrollView height="25%">
                    <Label verticalAlignment="top" horizontalAlignment="left" textWrap="true">
                        <FormattedString>
                            <Span ref="transcriptionLbl" class="transcription"></Span>
                        </FormattedString>
                    </Label>
                </ScrollView>
                <Button class="btn score" @tap="getScore()" text="Get my Score"></Button>
            </StackLayout>
    </StackLayout>
</StackLayout>
</Page>
</template>
<script>

import { mapState, mapGetters } from 'vuex';
import { SpeechRecognition, SpeechRecognitionTranscription, SpeechRecognitionOptions } from "nativescript-speech-recognition";


export default {
  name: 'assignment',
  data: () => ({
    isSpeaking: false,
    speechRecognition: new SpeechRecognition()
    }),
  computed: {
      ...mapState(['user', 'activeClassroom']),
      ...mapGetters(['assignment'])
    },
    watch: {
      '$route.params.id': {
        handler(id) {
          this.$store.commit('setActiveAssignment', this.$route.params.id)
        },
        immediate: true
      }
    },
    mounted() {
        this.speechRecognition.requestPermission().then((granted) => {
            if (!granted){
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
        function(available) {
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
      goBack() {
        this.$navigateBack()
      },
      startListening() {
        this.isSpeaking = true;
        this.speechRecognition.startListening(
          {
            onResult: (transcription) => {
              this.$refs.transcriptionLbl.nativeView.text = transcription.text;
            },
            returnPartialResults: true,
            locale: 'FR'
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
          //compare
           console.log(this.assignment.Text, this.$refs.transcriptionLbl.nativeView.text)
           let score = this.similarity(this.assignment.Text,this.$refs.transcriptionLbl.nativeView.text)
           console.log(score)
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
}
.stop {
    background-color: #90D2C5;
}

.score {
    background-color: #F3F3F3;
    
}
.transcription {
    margin: 10 0;
    padding: 10;
    border-radius: 5;
    height: 100;
    border-color: #F3F3F3;
    background-color: #F3F3F3;
    font-size: 15;
}
.instruction {
    font-family: "Quicksand";
    text-align: center;
}
</style>
