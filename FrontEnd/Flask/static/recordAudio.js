//List DOM elements
var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
var audioPlayback = document.getElementById('audio_playback');
var downloadButton = document.getElementById('download');
var reverbSmallRoom = document.getElementById('smallroom')
var reverbCaveEffect = document.getElementById('cave');
var ReverbConcertHall = document.getElementById('concert');
var process = document.getElementById('process');
var save = document.getElementById('save');
stopButton.disabled = true;
audioPlayback.disabled = true;



//List custom events
var micOn = new Event('micOn');

const wavesurferConstraints = {
    container: document.getElementById('waveform'),
    waveColor: 'blue',
    progressColor: 'red',
    backend: 'WebAudio',
    plugins: [
        WaveSurfer.cursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '10px'
            }
        })
    ]
}

var getmediaConstraints = {
    audio: true
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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

        stopButton.onclick = function() {
            mediaRecorder.stop();
            stopButton.disabled = true;
            console.log("Media Recorder State: " + mediaRecorder.state);
        }
        mediaRecorder.ondataavailable = function(e) { chunks.push(e.data) }; //on data available event handler
        mediaRecorder.onstop = function(e) { //on stop event handler
            //var clipName = prompt("Enter a name for your sound clip: ");
            var blob = new Blob(chunks, { 'type': 'audio/wav; codecs=opus' }); //Creating a new blob
            chunks = []; //Reset our chunks
            console.log("hey")
            console.log(blob.size);
            console.log("bye")

            // process.onclick = function(blob) {

            //     if (reverbSmallRoom.onclick) {
            //         if (blob.size == 0) {
            //             console.log('Error fetching blob');
            //         } else {
            //             var smallRoomTransfer = new FormData();
            //             smallRoomTransfer.append('blob', blobUrl);
            //             smallRoomTransfer.append('smallRoom', 'reverbSmallRoom');
            //         }
            //     } else if (reverbCaveEffect.onclick) {
            //         if (blob.size == 0) {
            //             console.log('Error fetching blob');
            //         } else {
            //             var caveTransfer = new FormData();
            //             caveTransfer.append('blob', blobUrl);
            //             caveTransfer.append('caveEffect', 'reverbCaveEffect');
            //         }
            //     } else if (ReverbConcertHall.onclick) {
            //         if (blob.size == 0) {
            //             console.log('Error fetching blob');
            //         } else {
            //             var concertTransfer = new FormData();
            //             concertTransfer.append('blob', blobUrl);
            //             concertTransfer.append('concertEffect', 'reverbConcertEffect');
            //         }
            //     } else {
            //         if (!ReverbConcertHall.click || !reverbCaveEffect.click || !reverbSmallRoom.click) {
            //             alert("Please select an effect");
            //         } else {
            //             reverbPromise = fetch('/', {
            //                 method: 'POST',
            //                 body: reverbTransfer
            //             }).promise.then((resp) => {
            //                 return resp.clone().blob();
            //             }).then((theBlob) => {
            //                 var blobUrl = window.URL.createObjectURL(blob);
            //                 var a = document.createElement("a");
            //                 a.href = blobUrl;
            //                 if (blobUrl.size() > 0) {
            //                     console.log("blob is size is greater than 0. blob has successfully worked")
            //                 } else {
            //                     alert('Error in returning blob');
            //                 }
            //             })
            //         }
            //     }
            // }

            // save.onclick = () => a.download = "New track";
            // a.download = "TESTING";
            //document.body.appendChild(a);
            //a.click();
            var blobUrl = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = blobUrl;
            audioPlayback.disabled = false;
            audioPlayback.src = blobUrl;
            console.log('Access your blob here: ' + blobUrl);
            var wavesurfer = WaveSurfer.create(wavesurferConstraints);
            wavesurfer.load(blobUrl);
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
    theBlob.name = fileName;
    return theBlob;
}

// audioPlayback.addEventListener("micOn", function(stream) {
//     var micInputWaveSurfer = WaveSurfer.create({
//         container: document.getElementById('micInput'),
//         waveColor: 'violet',
//         progressColor: 'purple',
//         backend: 'WebAudio',
//         plugins: [WaveSurfer.microphone.create()],
//     })

//     micInputWaveSurfer.microphone.start();
//})