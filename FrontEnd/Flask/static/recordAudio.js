var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
var audioPlayback = document.getElementById('audio_playback');
stopButton.disabled = true; //Disable stopping recording when not recording in the first place
//Gets audio permission from browser & creates a new MediaStream on success

var blobReadyEvent = new Event ('blobReady');

var wavesurferConstraints = {
   container: document.getElementById('waveform'),
   waveColor: 'violet',
   progressColor: 'purple',
   backend: 'WebAudio'
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
            audioPlayback.src = blobUrl;
            console.log('Access your blob here: ' + blobUrl);
            //audioPlayback.dispatchEvent(blobReadyEvent);
            var wavesurfer = WaveSurfer.create(wavesurferConstraints);
            wavesurfer.load(blobUrl);
       }
    }
    var onError = function(err){console.log("Something went wrong!");}
    navigator.mediaDevices.getUserMedia(getmediaConstraints).then(onSuccess, onError);
    }
    else {
       console.log('getUserMedia not supported on your browser!');
    }

audioPlayback.addEventListener("blobReady", function(){
   console.log('Hey you hit the custom event!');
   var wavesurfer = WaveSurfer.create(wavesurferConstraints);
   wavesurfer.load(blobUrl);
});



//}
//Creates new media recorder instance and passes it the stream directly.
//At this point, the stream is ready to be captured into a Blob (file-like object of immutable, raw data)

/*
startButton.onclick = function(){
   console.log("hit me")
   stopButton.disabled = false; //Enable stopping now that we are recording
   mediaRecorder.start();
   console.log("Media Recorder status: " + mediaRecorder.active);
}

*/
