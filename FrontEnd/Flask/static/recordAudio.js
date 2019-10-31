//List DOM elements
var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
var audioPlayback = document.getElementById('audio_playback');
var downloadButton = document.getElementById('download');
// var reverbSmallRoom = document.getElementById('SigProcMen').options[0].value;
// var reverbCaveEffect = document.getElementById('SigProcMen').options[1].value;
// var ReverbConcertHall = document.getElementById('SigProcMen').options[2].value;
//var  d = dropdown.options[dropdown.selectedIndex].value;
var selectedEffect = document.getElementById("procMenu");
var effectHolder;
var process = document.getElementById('process');
var save = document.getElementById('save');
stopButton.disabled = true;
audioPlayback.disabled = true;

function getSelectedEffect() {
    console.log(selectedEffect.options[selectedEffect.selectedIndex].value)
    effectHolder = selectedEffect.options[selectedEffect.selectedIndex].value
}



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
                padding: '4px',
                'font-size': '14px'
            }
        }),
        WaveSurfer.regions.create({
            regions: [{
                drag: true,
                start: 1,
                end: 3,
                color: 'hsla(400, 100%, 30%, 0.5)',
                resize: true
            }]
        })
    ]
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
            //var clipName = prompt("Enter a name for your sound clip: ");
            var blob = new Blob(chunks, { 'type': 'audio/wav' }); //Creating a new blob
            console.log("mediarecorder done");
            console.log("blob file name " + blob.fileName)
            console.log("blobl size " + blob.size)
            console.log("blob is " + blob)
            var blobUrl = window.URL.createObjectURL(blob);

            /**
             * Display original waveform from initial recording
             *  
             * */

            wavesurfer = WaveSurfer.create(wavesurferConstraints);
            wavesurfer.load(blobUrl)

            // Promise- return either data you want or an error takes time to fetch. 

            //Promise - used for when you want a value but don't know how long it'll take to get it
            //Fetch - used for when you need a promise that uses HTTP request methods
            var effectsForBlob = new FormData();
            effectsForBlob.append('blob', blob, 'blob.wav');
            console.log("blob is appended" + blob);

            var smallRoom = false;
            var caveEffect = false;
            var concertEffect = false;
            var reverse = false;
            audioPlayback.src = blobUrl;

            const onclick = (blobUrl, blob) => {
                console.log("blob is " + blob)
                    // var downloadable = new Blob(chunks, { 'type': 'audio/wav' }); //Creating a new blob
                    // var blobDown = window.URL.createObjectURL(downloadable)
                var a = document.createElement("a");
                a.href = blobUrl
                a.setAttribute("download", blob.fileName)
                    //download(downloadable, "song.wav", "audio/wav")
                    //a.target = '_blank'
                console.log("saved clicked")
                console.log("blob file name " + blob.fileName)
                console.log("blobl size " + blob.size)
                console.log("blob is " + blob)
                    //a.download = downloadable.fileName
                document.body.appendChild(a)

                a.click()
                console.log("a.download" + a + "   " + a.download)
                console.log("should download by now")
            }



            process.onclick = (blob) => {
                console.log("blob is " + blob)
                if (effectHolder == "ReverbSmallRoom") {
                    alert("effect holder value is: " + effectHolder)
                    smallRoom = true;
                    effectsForBlob.append('effectHolder', 'smallRoom');
                    console.log("transferring small room effect over");
                }

                if (effectHolder == "Cave") {
                    alert("effect holder value is: " + effectHolder);
                    caveEffect = true;
                    effectsForBlob.append('effectHolder', 'caveEffect');
                    console.log("transferring cave effect over");
                }
                if (effectHolder == "Concert") {
                    alert("effect holder value is: " + effectHolder);
                    concertEffect = true;
                    effectsForBlob.append('effectHolder', 'concertHall');
                    console.log("transferring concert hall effect over");
                }
                if (effectHolder == "Reverse") {
                    alert("effect holder value is: " + effectHolder)
                    reverse = true;
                    effectsForBlob.append('effectHolder', 'reverse')
                    console.log("transferring reverse effect over")
                }


                console.log("process button has been pressed")


                if (!concertEffect && !caveEffect && !smallRoom && !reverse) {
                    alert("Please select an effect");
                }
                console.log("effects for blob: ");
                for (var value of effectsForBlob.values()) {
                    console.log(value);
                }
                var blobPromise = fetch('/home', {

                    method: 'POST',
                    // headers: { 'Content-type': 'application/octet-stream' },
                    body: effectsForBlob
                })


                blobPromise.then((resp) => {
                    return resp.clone().blob()
                }).then((theBlob) => {
                    console.log("did theblob come? " + theBlob.type);
                    var a = document.createElement("a");

                    var blobUrlEffect = window.URL.createObjectURL(theBlob);
                    console.log("in the process statement where bloburl is " + blobUrl)
                    a.href = blobUrlEffect;
                    console.log("after process new blob is " + blobUrlEffect)
                    console.log("a.download is " + a.download)
                        //a.download
                        //document.body.appendChild(a)
                    a.download = theBlob.fileName;
                    document.body.appendChild(a);
                    //a.click();
                    audioPlayback.disabled = false;
                    audioPlayback.src = blobUrlEffect;
                    console.log('Access your blob here: ' + blobUrlEffect);
                    wavesurfer = WaveSurfer.create(wavesurferConstraints);
                    wavesurfer.load(blobUrlEffect)


                })
                blobPromise.catch((postErrors) => {
                        console.log("error occured " + postErrors);
                    })
                    //var clipName = prompt("Enter a name for your sound clip: ");
                    // var blob = new Blob(chunks, { 'type': 'audio/wav; codecs=opus' }); //Creating a new blob
                    // chunks = []; //Reset our chunks
                    // console.log("\nhey out of promise")
                    // console.log("blob sisze is: " + blob.size);
            }

            save.addEventListener("click", function() {
                onclick(blobUrl, blob)
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

// audioPlayback.addEventListener("micOn", function(stream) {
//     var micInputWaveSurfer = WaveSurfer.create({
//         container: document.getElementById('micInput'),
//         waveColor: 'violet',
//         progressColor: 'purple',
//         backend: 'WebAudio',
//         plugins: [WaveSurfer.microphone.create()],
//     })

// micInputWaveSurfer.microphone.start();
// })


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


// blobPromise.then((fetch('/', {
//     method: 'GET',
//     header: { 'Content-type': 'application/octet-stream' }
// })))
// blobPromise.then(response => {
//     response.blob()
// })


// var blobData = [];
// blobData.push(theBlob)
// console.log(theBlob);

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
//             var blobUrl = window.URL.createObjectURL(blob);
//             var a = document.createElement("a");
//             a.href = blobUrl;
//             audioPlayback.disabled = false;
//             audioPlayback.src = blobUrl;
//             console.log('Access your blob here: ' + blobUrl);
//             var wavesurfer = WaveSurfer.create(wavesurferConstraints);
//             wavesurfer.load(blobUrl);
//     micInputWaveSurfer.microphone.start();
//})