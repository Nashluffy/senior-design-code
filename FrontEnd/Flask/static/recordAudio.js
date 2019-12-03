//List DOM elements
var stopButton = document.getElementById('stop_button');
var startButton = document.getElementById('start_button');
var audioPlayback = document.getElementById('audio_playback');
var selectedEffect = document.getElementById("procMenu");
var effectHolder;
var process = document.getElementById('process');
var save = document.getElementById('save');
stopButton.disabled = true;
//audioPlayback.disabled = true;

var stopButton2 = document.getElementById('stop_button2');
var startButton2 = document.getElementById('start_button2');
var audioPlayback2 = document.getElementById('audio_playback2');
var selectedEffect2 = document.getElementById("procMenu2");
var fileElement2 = document.getElementById("fileSel2");
var effectHolder2;
var process2 = document.getElementById('process2');
var save2 = document.getElementById('save2');
stopButton2.disabled = true;
audioPlayback2.disabled = true;
//Iframe stuff
var tag = document.createElement('script');

var fileblob;

var timeForBlob;

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
        videoId: "uOf-JRlyzqA",
    })
}

function play() {
    player.playVideo();
}

function stop() {
    player.stopVideo();
}

function restart() {
    console.log(audioPlayback.duration);
    if (audioPlayback.duration === Infinity) {
        // set it to bigger than the actual duration
        audioPlayback.currentTime = 1e101;
        audioPlayback.ontimeupdate = function() {
            this.ontimeupdate = () => {
                return;
            }
            audioPlayback.currentTime = 0;
        }
    }
    player.loadVideoById({
        'videoId': 'uOf-JRlyzqA',
        'startSeconds': 0,
        'endSeconds': timeForBlob
    });

}


function getSelectedEffect() {
    console.log(selectedEffect.options[selectedEffect.selectedIndex].value)
    effectHolder = selectedEffect.options[selectedEffect.selectedIndex].value
}

function getSelectedEffect2() {
    console.log(selectedEffect2.options[selectedEffect2.selectedIndex].value)
    effectHolder2 = selectedEffect2.options[selectedEffect2.selectedIndex].value
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

const wavesurferConstraints2 = {
    container: document.getElementById('waveform2'),
    waveColor: 'green',
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
fileElement2.addEventListener("change", handleFiles2, false);



function handleFiles2() {

    // alert(this.value);

    console.log("in the onchange")

    var curFiles = this.files;

    console.log("type" + curFiles.type)
    console.log("file name " + curFiles.size)

    var blobAudio = window.URL.createObjectURL(curFiles[0]);
    wavesurfer = WaveSurfer.create(wavesurferConstraints2);
    wavesurfer.load(blobAudio);
    audioPlayback2.src = blobAudio

    var chunks = [];

    process2.onclick = (blob) => {
        blob = new Blob(chunks, { 'type': 'audio/wav' }); //Creating a new blob

        var effectsForBlob = new FormData();
        effectsForBlob.append('blob', blob, 'blob.wav');
        console.log("blob is appended" + blob);
        console.log("blob is type " + blob.type + "  " + blob.URL)
        if (effectHolder2 == "reverbSmallRoom") {
            alert("effect holder value is: " + effectHolder2)
            effectsForBlob.append('effectHolder', 'reverbSmallRoom');
            console.log("transferring small room effect over");
            applied = true;
        } else if (effectHolder2 == "reverbCaveEffect") {
            alert("effect holder value is: " + effectHolder2);
            effectsForBlob.append('effectHolder', 'reverbCaveEffect');
            console.log("transferring cave effect over");
            applied = true;
        } else if (effectHolder2 == "reverbConcertHall") {
            alert("effect holder value is: " + effectHolder2);
            effectsForBlob.append('effectHolder', 'reverbConcertHall');
            console.log("transferring concert hall effect over");
            applied = true;
        } else if (effectHolder2 == "miscReset") {
            alert("effect holder value is: " + effectHolder2)
            effectsForBlob.append('effectHolder', 'miscReset');
            applied = true;
        } else if (effectHolder2 == "miscReverseSong") {
            alert("effect holder value is: " + effectHolder2)
            effectsForBlob.append('effectHolder', 'miscReverseSong')
            console.log("transferring reverse effect over")
            applied = true;
        } else if (effectHolder2 == "miscSpeedUp2x") {
            alert("effect holder value is: " + effectHolder2)
            effectsForBlob.append('effectHolder', 'miscSpeedUp2x')
            console.log("transferring reverse effect over")
            applied = true;
        } else if (effectHolder2 == "miscSlowDownHalf") {
            alert("effect holder value is: " + effectHolder2)
            effectsForBlob.append('effectHolder', 'miscSlowDownHalf')
            console.log("transferring reverse effect over")
            applied = true;
        } else if (effectHolder2 == "phaserDefault") {
            alert("effect holder value is: " + effectHolder2)
            effectsForBlob.append('effectHolder', 'phaserDefault')
            console.log("transferring reverse effect over")
            applied = true;
        } else if (effectHolder2 == "phaserSpaceEffect") {
            alert("effect holder value is: " + effectHolder2)
            effectsForBlob.append('effectHolder', 'phaserSpaceEffect')
            console.log("transferring reverse effect over")
            applied = true;
        } else if (effectHolder2 == "phaserSubtle") {
            alert("effect holder value is: " + effectHolder2)
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
            //console.log("in the process statement where bloburl is " + blobUrl)
            a.href = blobUrlEffect;
            //a.download = theBlob.fileName;
            document.body.appendChild(a);

            audioPlayback2.disabled = false;
            audioPlayback2.src = blobUrlEffect;
            console.log('Access your blob here: ' + blobUrlEffect);
            wavesurfer = WaveSurfer.create(wavesurferConstraints2);
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

    //console.log("Blob being sent from process? " + blobPromise.URL + " " + theBlob.type)

    save.addEventListener("click", function() {
        onclick(blobUrl, blob)
    })
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    //navigator is the web browser that it's running on (JS object)
    //making sure the features you need are compatible with the browser you're running on
    console.log('getUserMedia supported.');
    // constraints - only audio needed for this app
    var onSuccess = function(stream) {
        var mediaRecorder = new MediaRecorder(stream);
        var chunks = [];
        var chunks2 = [];
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
        audioPlayback2.dispatchEvent(micOn);
        startButton2.onclick = function() {
            stopButton2.disabled = false; //Enable stopping now that we are recording
            mediaRecorder.start();

            mediaRecorder.ondataavailable = e => {
                chunks2.push(e.data);
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
        stopButton2.onclick = function() {
            mediaRecorder.stop();
            stopButton2.disabled = true;
            console.log("Media Recorder State: " + mediaRecorder.state);
        }
        mediaRecorder.ondataavailable = function(e) { chunks.push(e.data) }; //on data available event handler
        mediaRecorder.onstop = function(e) { //on stop event handler


            if (chunks2.length == 0 || chunks.length > 0) {
                var chunksEff = chunks;
                var blob = new Blob(chunks, { 'type': 'audio/wav' }); //Creating a new blob
                console.log("mediarecorder done");
                console.log("blob file name " + blob.fileName)
                console.log("blobl size " + blob.size)
                console.log("blob is " + blob)
                console.log("Chunks length" + chunks.length)
                var blobUrl = window.URL.createObjectURL(blob);
                chunks = [];

                /**
                 * Display original waveform from initial recording
                 *  
                 * */

                wavesurfer = WaveSurfer.create(wavesurferConstraints);
                wavesurfer.load(blobUrl)
                audioPlayback.src = blobUrl;
                wavesurfer.on('ready', function() {
                    timeForBlob = wavesurfer.getDuration();
                });
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



                }
            } else {
                var chunksEff2 = chunks2;
                var blob = new Blob(chunks2, { 'type': 'audio/wav' }); //Creating a new blob
                console.log("mediarecorder done");
                console.log("blob file name " + blob.fileName)
                console.log("blobl size " + blob.size)
                console.log("blob is " + blob)
                chunks2 = [];
                console.log("Chunks2 length" + chunks2.length)
                var blobUrl = window.URL.createObjectURL(blob);

                /**
                 * Display original waveform from initial recording
                 *  
                 * */

                wavesurfer = WaveSurfer.create(wavesurferConstraints2);
                wavesurfer.load(blobUrl)
                audioPlayback2.src = blobUrl;

                var applied = false;
                // Promise- return either data you want or an error takes time to fetch. 

                //Promise - used for when you want a value but don't know how long it'll take to get it
                //Fetch - used for when you need a promise that uses HTTP request methods



                var smallRoom = false;
                var caveEffect = false;
                var concertEffect = false;
                var reverse = false;
                audioPlayback2.src = blobUrl;

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
            }




            process.onclick = (blob) => {
                blob = new Blob(chunksEff, { 'type': 'audio/wav' }); //Creating a new blob
                console.log("blobl size in process " + blob.size)

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
                } else if (effectHolder == "miscReset") {
                    alert("effect holder value is: " + effectHolder)
                    effectsForBlob.append('effectHolder', 'miscReset');
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

            process2.onclick = (blob) => {
                blob = new Blob(chunksEff2, { 'type': 'audio/wav' }); //Creating a new blob

                var effectsForBlob = new FormData();
                effectsForBlob.append('blob', blob, 'blob.wav');
                console.log("blob is appended" + blob);
                console.log("blob is type " + blob.type + "  " + blob.URL)
                if (effectHolder2 == "reverbSmallRoom") {
                    alert("effect holder value is: " + effectHolder2)
                    effectsForBlob.append('effectHolder', 'reverbSmallRoom');
                    console.log("transferring small room effect over");
                    applied = true;
                } else if (effectHolder2 == "reverbCaveEffect") {
                    alert("effect holder value is: " + effectHolder2);
                    effectsForBlob.append('effectHolder', 'reverbCaveEffect');
                    console.log("transferring cave effect over");
                    applied = true;
                } else if (effectHolder2 == "reverbConcertHall") {
                    alert("effect holder value is: " + effectHolder2);
                    effectsForBlob.append('effectHolder', 'reverbConcertHall');
                    console.log("transferring concert hall effect over");
                    applied = true;
                } else if (effectHolder2 == "miscReset") {
                    alert("effect holder value is: " + effectHolder2)
                    effectsForBlob.append('effectHolder', 'miscReset');
                    applied = true;
                } else if (effectHolder2 == "miscReverseSong") {
                    alert("effect holder value is: " + effectHolder2)
                    effectsForBlob.append('effectHolder', 'miscReverseSong')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder2 == "miscSpeedUp2x") {
                    alert("effect holder value is: " + effectHolder2)
                    effectsForBlob.append('effectHolder', 'miscSpeedUp2x')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder2 == "miscSlowDownHalf") {
                    alert("effect holder value is: " + effectHolder2)
                    effectsForBlob.append('effectHolder', 'miscSlowDownHalf')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder2 == "phaserDefault") {
                    alert("effect holder value is: " + effectHolder2)
                    effectsForBlob.append('effectHolder', 'phaserDefault')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder2 == "phaserSpaceEffect") {
                    alert("effect holder value is: " + effectHolder2)
                    effectsForBlob.append('effectHolder', 'phaserSpaceEffect')
                    console.log("transferring reverse effect over")
                    applied = true;
                } else if (effectHolder2 == "phaserSubtle") {
                    alert("effect holder value is: " + effectHolder2)
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

                    audioPlayback2.disabled = false;
                    audioPlayback2.src = blobUrlEffect;
                    console.log('Access your blob here: ' + blobUrlEffect);
                    wavesurfer = WaveSurfer.create(wavesurferConstraints2);
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

            //console.log("What is new blob " + blob.URL)
            //console.log("Blob being sent from process? " + blobPromise.URL + " " + theBlob.type)

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