var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
stopButton.disabled = true; //Disable stopping recording when not recording in the first place
//Gets audio permission from browser & creates a new MediaStream on success
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   console.log('getUserMedia supported.');
   // constraints - only audio needed for this app
   var constraints = 
      {
         audio: true
      }
   var onSuccess = function(stream){
      var mediaRecorder = new MediaRecorder(mediaStream); 

      startButton.onclick = function(){
         console.log("hit me")
         stopButton.disabled = false; //Enable stopping now that we are recording
         mediaRecorder.start();
         console.log("Media Recorder status: " + mediaRecorder.active);
      }
   
      stopButton.onclick = function(){
         mediaRecorder.stop();
         console.log("Recording stopped")
      }
   }
   var onError = function(err){console.log("Something went wrong!");}
   navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
   }
   else {
      console.log('getUserMedia not supported on your browser!');
   }
//}
//Creates new media recorder instance and passes it the stream directly.
//At this point, the stream is ready to be captured into a Blob (file-like object of immutable, raw data)

startButton.onclick = function(){
   console.log("hit me")
   stopButton.disabled = false; //Enable stopping now that we are recording
   mediaRecorder.start();
   console.log("Media Recorder status: " + mediaRecorder.active);
}