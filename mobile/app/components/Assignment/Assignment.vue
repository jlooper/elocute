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
        <ScrollView style="height: 100%">
            <StackLayout class="card">
                <Label class="instruction" textWrap="true" text="Press the 'start' button, then read this text aloud, slowly and clearly"></Label>
                <Button class="btn start" @tap="startListening()" text="Start"></Button>
                <StackLayout class="transcription" >
                    <Label textWrap="true" :text="assignment.Text"></Label>
                </StackLayout>
                <Button class="btn stop" @tap="stopListening()" text="Stop"></Button>
                <activity-indicator :busy="isSpeaking"></activity-indicator>
                <StackLayout class="shaded">
                    <Label #transcriptionLbl></Label>
                </StackLayout>
                <Button class="btn score" text="Get my Score"></Button>
            </StackLayout>
        </ScrollView>
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
    //transcription: SpeechRecognitionTranscription
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
            console.log("Granted? " + granted);
            alert(granted)
        });     
    },
    created() {
        this.init();      
    },
    methods: {
      init() {
        //this errors
        this.speechRecognition.available().then(
        function(available) {
            console.log(available);
        });
      },
      requestPermission() {
        this.speechRecognition.requestPermission().then((granted) => {
            console.log("Granted? " + granted);
            alert(granted)
        })
      },
      goBack() {
        this.$navigateBack()
      },
      startListening() {
        this.speechRecognition.startListening(
          {
            onResult: (transcription) => {
              console.log(transcription.text,transcription.finished);
            },
            returnPartialResults: true,
            locale: 'en-US'
          }
      ).then((started) => {
        
      }, (errorMessage) => {
        console.log(`Error while trying to start listening: ${errorMessage}`);
      });
      
        /*const options = {
            locale: 'en-US',
            onResult: (transcription) => {
                console.log(transcription.text,transcription.finished);
                this.transcription = transcription;
            }
        }
        this.speechRecognition.startListening(options).then(() => {
            //this.showActivityIndicator();
            console.log("Started")
        }, error => {
            //this.hideActivityIndicator();
            console.log(error)
        })*/
      },
      stopListening() {
        this.speechRecognition.stopListening().then(() => {
            //this.hideActivityIndicator();
            console.log("Stopped")
        })
      },
      showActivityIndicator() {
        //this.isSpeaking = true;
      },
      hideActivityIndicator() {
        //this.isSpeaking = false;
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
.shaded {
    border-radius: 5;
    border-color: #F3F3F3;
    background-color: #F3F3F3;
    height: 100;
    font-size: 15;
}
.transcription {
    margin: 10 0;
    padding: 10;
    border-radius: 5;
    border-color: #F3F3F3;
    background-color: #F3F3F3;
    font-size: 15;
}
.instruction {
    font-family: "Quicksand";
    text-align: center;
}
</style>
