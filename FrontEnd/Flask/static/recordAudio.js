//List DOM elements
var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
var audioPlayback = document.getElementById('audio_playback');
var reverbSmallRoom = document.getElementById('SigProcMenu').namedItem("ReverbSmallRoom");
var reverbCaveEffect = document.getElementById('SigProcMenu').namedItem("ReverbCaveEffect");
var ReverbConcertHall = document.getElementById('SigProcMenu').namedItem("ReverbConcertHall");
stopButton.disabled = true;
audioPlayback.disabled = true;


//List custom events
var micOn = new Event('micOn');

var wavesurferConstraints = {
    container: document.getElementById('waveform'),
    waveColor: 'violet',
    progressColor: 'purple',
    backend: 'WebAudio',
}

var getmediaConstraints = {
    audio: true
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //navigator is the web browser that it's running on (JS object)
    //making sure the features you need are compatible with the browser you're running on

    console.log('getUserMedia supported.');
    // constraints - only audio needed for this app
    var onSuccess = function(stream) {
        var mediaRecorder = new MediaRecorder(stream);
        var chunks = [];
        audioPlayback.dispatchEvent(micOn);
        startButton.onclick = function() {
            stopButton.disabled = false; //Enable stopping now that we are recording
            mediaRecorder.start();
            mediaRecorder.ondataavailable = e => {
                chunks.push(e.data);
            }
            console.log("Media Recorder State: " + mediaRecorder.state);
        }

        //1) send the blob the backend
        //2) then the user will select an effect
        //3) 

        stopButton.onclick = function() {
            mediaRecorder.stop();
            stopButton.disabled = true;
            console.log("Media Recorder State: " + mediaRecorder.state);
        }
        mediaRecorder.ondataavailable = function(e) { chunks.push(e.data) }; //on data available event handler
        mediaRecorder.onstop = function(e) { //on stop event handler

            var clipName = prompt("Enter a name for your sound clip: ");
            var blob = new Blob(chunks, { 'type': 'audio/wav; codecs=0' }); //Creating a new blob
            chunks = [];
            console.log("mediarecorder done");

            // Promise- return either data you want or an error takes time to fetch. 

            //Promise - used for when you want a value but don't know how long it'll take to get it
            //Fetch - used for when you need a promise that uses HTTP request methods
            var formData = new FormData();
            formData.append('blob', blob, 'blob.wav');
            formData.append('test', 'test');

            var blobPromise = fetch('/', {

                method: 'POST',
                headers: { 'Content-type': 'application/octet-stream' },
                body: formData
            })

            blobPromise.then((resp) => {
                console.log('Successfull response \n' + resp);

                return resp.blob();

            })

            blobPromise.catch((postErrors) => {
                console.log("error occured " + postErrors);
            })

            // blobPromise.then((fetch('/', {
            //     method: 'GET',
            //     header: { 'Content-type': 'application/octet-stream' }
            // })))
            // blobPromise.then(response => {
            //     response.blob()
            // })
            blobPromise.then((theBlob) => {
                console.log("did theblob come? " + theBlob):


                    var blobUrl = window.URL.createObjectURL(theBlob);
                var a = document.createElement("a");
                a.href = blobUrl;
                a.download = clipName;
                document.body.appendChild(a);
                a.click();
                audioPlayback.disabled = false;
                audioPlayback.src = blobUrl;
                console.log('Access your blob here: ' + blobUrl);
                var wavesurfer = WaveSurfer.create(wavesurferConstraints);
                wavesurfer.load()
            })
            blobPromise.catch((error) => {
                console.log("error occured when getting blob back " + error)
            })




        }
    }
    var onError = function(err) { console.log("Something went wrong!" + err); }
    navigator.mediaDevices.getUserMedia(getmediaConstraints).then(onSuccess, onError);
} else {
    console.log('getUserMedia not supported on your browser!');
}

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    blobUrl
    theBlob.name = fileName;
    return theBlob;
}

audioPlayback.addEventListener("micOn", function(stream) {
    var micInputWaveSurfer = WaveSurfer.create({
        container: document.getElementById('micInput'),
        waveColor: 'violet',
        progressColor: 'purple',
        backend: 'WebAudio',
        plugins: [WaveSurfer.microphone.create()],
    })

    micInputWaveSurfer.microphone.start();
})


/* Excess code may reference later

var downloadButton = document.getElementById('download');

      // chunks = []; //Reset our chunks
      var blobUrl = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
   a.href = blobUrl;
     a.download = clipName;
     document.body.appendChild(a);
     a.click();
     audioPlayback.disabled = false;
    audioPlayback.src = blobUrl;
  console.log('Access your blob here: ' + blobUrl);
   var wavesurfer = WaveSurfer.create(wavesurferConstraints);
   */
// wavesurfer.load(blobUrl);