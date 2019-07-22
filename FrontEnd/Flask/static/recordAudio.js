//List DOM elements
var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
var audioPlayback = document.getElementById('audio_playback');
var downloadButton = document.getElementById('download');
stopButton.disabled = true;
audioPlayback.disabled = true;



//List custom events
var micOn = new Event ('micOn');

var wavesurferConstraints = {
   container        :   document.getElementById('waveform'),
   waveColor        :   'violet',
   progressColor    :   'purple',
   backend          :   'WebAudio',
}

var getmediaConstraints =
{
   audio: true
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   console.log('getUserMedia supported.');
   // constraints - only audio needed for this app
   var onSuccess = function(stream){
      var mediaRecorder = new MediaRecorder(stream);
      var chunks = [];
      audioPlayback.dispatchEvent(micOn);
      startButton.onclick = function(){
         stopButton.disabled = false; //Enable stopping now that we are recording
         mediaRecorder.start();
         console.log("Media Recorder State: " + mediaRecorder.state);
      }

      stopButton.onclick = function(){
         mediaRecorder.stop();
         stopButton.disabled = true;
         console.log("Media Recorder State: " + mediaRecorder.state);
       }
       mediaRecorder.ondataavailable = function(e){chunks.push(e.data)}; //on data available event handler
       mediaRecorder.onstop = function(e){ //on stop event handler
           var clipName = prompt("Enter a name for your sound clip: ");
           var blob = new Blob(chunks, {'type' : 'audio/ogg; codecs=opus'}); //Creating a new blob
           chunks = []; //Reset our chunks
           var blobUrl = window.URL.createObjectURL(blob);
           var a = document.createElement("a");
           a.href = blobUrl;
           a.download = "TESTING";
           document.body.appendChild(a);
           a.click();
           audioPlayback.disabled = false;
           audioPlayback.src = blobUrl;
           console.log('Access your blob here: ' + blobUrl);
           var wavesurfer = WaveSurfer.create(wavesurferConstraints);
           wavesurfer.load(blobUrl);
       }
   }
   var onError = function(err){console.log("Something went wrong!" + err);}
   navigator.mediaDevices.getUserMedia(getmediaConstraints).then(onSuccess, onError);
}
    else {
       console.log('getUserMedia not supported on your browser!');
    }

function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

audioPlayback.addEventListener("micOn", function(stream){
   var micInputWaveSurfer = WaveSurfer.create({
      container        :   document.getElementById('micInput'),
      waveColor        :   'violet',
      progressColor    :   'purple',
      backend          :   'WebAudio',
      plugins: [WaveSurfer.microphone.create()],
   })

   micInputWaveSurfer.microphone.start();
})
