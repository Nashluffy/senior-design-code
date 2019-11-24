//List DOM elements
var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
var audioPlayback = document.getElementById('audio_playback');
var downloadButton = document.getElementById('download');
var selectedEffect = document.getElementById("procMenu");
var fileElement = document.getElementById("fileSel");
var effectHolder;
var process = document.getElementById('process');
var save = document.getElementById('save');
stopButton.disabled = true;
audioPlayback.disabled = true;

//Iframe stuff
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("card-bodyPlay", {
        height: '315',
        width: '560',
        videoId: "yPLLhlX0YXM",
    })
}

function play() {
    player.playVideo();
}

function stop() {
    player.stopVideo();
}


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
fileElement.addEventListener("change", handleFiles, false);

function handleFiles() {

    // alert(this.value);

    console.log("in the onchange")

    var curFiles = this.files;

    console.log("type" + curFiles.type)
    console.log("file name " + curFiles.size)

    var blobAudio = window.URL.createObjectURL(curFiles[0]);
    wavesurfer = WaveSurfer.create(wavesurferConstraints);
    wavesurfer.load(blobAudio);
    audioPlayback.src = blobAudio
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

            play();

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
            stop()
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
            audioPlayback.src = blobUrl;

            var applied = false;
            // Promise- return either data you want or an error takes time to fetch. 

            //Promise - used for when you want a value but don't know how long it'll take to get it
            //Fetch - used for when you need a promise that uses HTTP request methods



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
                blob = new Blob(chunks, { 'type': 'audio/wav' }); //Creating a new blob

                var effectsForBlob = new FormData();
                effectsForBlob.append('blob', blob, 'blob.wav');
                console.log("blob is appended" + blob);
                console.log("blob is type " + blob.type + "  " + blob.URL)
                if (effectHolder == "reverbSmallRoom") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'reverbSmallRoom');
                    console.log("transferring small room effect over");
                    applied = true;
                } else if (effectHolder == "reverbCaveEffect") {
                    alert("effect holder value is: " + effectHolder);
                    effectsForBlob.append('effectHolder', 'reverbCaveEffect');
                    console.log("transferring cave effect over");
                    applied = true;
                } else if (effectHolder == "reverbConcertHall") {
                    alert("effect holder value is: " + effectHolder);
                    effectsForBlob.append('effectHolder', 'reverbConcertHall');
                    console.log("transferring concert hall effect over");

                    applied = true;
                } else if (effectHolder == "miscReverseSong") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'miscReverseSong')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder == "miscSpeedUp2x") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'miscSpeedUp2x')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder == "miscSlowDownHalf") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'miscSlowDownHalf')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder == "phaserDefault") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'phaserDefault')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder == "phaserSpaceEffect") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'phaserSpaceEffect')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder == "phaserSubtle") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'phaserSubtle')
                    console.log("transferring reverse effect over")
                    applied = true;
                }

                console.log("process button has been pressed")


                if (!applied) {
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
                    //a.download = theBlob.fileName;
                    document.body.appendChild(a);

                    audioPlayback.disabled = false;
                    audioPlayback.src = blobUrlEffect;
                    console.log('Access your blob here: ' + blobUrlEffect);
                    wavesurfer = WaveSurfer.create(wavesurferConstraints);
                    wavesurfer.load(blobUrlEffect)
                    return theBlob


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

            console.log("What is new blob " + blob.URL)
            console.log("Blob being sent from process? " + theBlob.URL + " " + theBlob.type)

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
