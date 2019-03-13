

//Gets audio permission from browser & creates media stream if successful
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { //Checking for getUserMedia support
   console.log('getUserMedia supported.'); 
   navigator.mediaDevices.getUserMedia (
      {
         audio: true
      })

      // Success callback
      .then(function(stream) { //Successful creation of a mdeia stream
         console.log("Stream created successfully")
      })

      // Error callback
      .catch(function(err) {
         console.log('The following getUserMedia error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

var mediaRecorder = new MediaRecorder(stream); //Creates new media recorder instance and passes it the stream directly.
//At this point, the stream is ready to be captured into a Blob (file-like object of immutable, raw data)


mediaRecorder.start();
console.log(mediaRecorder.state);
console.log("recorder started");
setTimeout(mediaRecorder.stop(), 10000);

