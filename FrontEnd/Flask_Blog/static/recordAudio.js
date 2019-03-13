var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');

//Gets audio permission from browser & creates media stream if successful
function getPermission(){
   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { //Checking for getUserMedia support
      console.log('getUserMedia supported.'); 
      navigator.mediaDevices.getUserMedia (
         {
            audio: true
         })

         // Success callback
         .then(function(stream) { //Successful creation of a media stream
               var mR = new MediaRecorder(stream);
               console.log("Hit me");
               console.log("Stream & MediaRecorder created successfully");
               return mR;
         })

         // Error callback
         .catch(function(err) {
            console.log('The following getUserMedia error occured: ' + err);
         }
      );
   } else {
      console.log('getUserMedia not supported on your browser!');
   }
     
}
//Creates new media recorder instance and passes it the stream directly.
//At this point, the stream is ready to be captured into a Blob (file-like object of immutable, raw data)


startButton.onclick = function(){startRecording()};
stopButton.onclick = function(){stopRecording()};

async function startRecording(){
      var mediaRecorder = await getPermission();
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("Recording started");
}   

function stopRecording(){
  mediaRecorder.stop();
  console.log("Recording stopped");
}       