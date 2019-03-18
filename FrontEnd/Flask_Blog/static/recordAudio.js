var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');

//Gets audio permission from browser & creates media stream if successful
 
//function getPermission(){
   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia (
         // constraints - only audio needed for this app
         {
            audio: true
         })
   } else {
      console.log('getUserMedia not supported on your browser!');
   }

//var onSuccess = function(stream){
   //var mediaRecorder = new MediaRecorder(stream); 
//   startButton.onclick = function(){startRecording()};
//   stopButton.onclick = function(){stopRecording()};

//}
//Creates new media recorder instance and passes it the stream directly.
//At this point, the stream is ready to be captured into a Blob (file-like object of immutable, raw data)

initializeRecorder = function(){
   var audioStream = stream;
   var mediaRecorder = new MediaRecorder(audioStream);
   console.log(mediaRecorder.state);
}
stopButton.onclick = function(){
   mediaRecorder.stop();
   console.log("Recording stopped")
};

startButton.onclick = function(){
   initializeRecorder();
   console.log("Recording started");
};



function startRecording(){

      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("Recording started");
}   

function stopRecording(){
  mediaRecorder.stop();
  console.log("Recording stopped");
}       