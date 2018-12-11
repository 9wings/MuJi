$(document).ready( () => {    
    var audio_context;
    var recorder;
    var audio_stream;
 
    // Prepare and check if requirements are filled
    Initialize();

    // Handle on start recording button
    document.getElementById("start-btn").addEventListener("click", function(){
        //console.log("Started recording");
        startRecording();
        document.getElementById('detect').innerHTML = "DETECTING...";
        document.getElementById('detect').style.marginTop = "30px"; 
    }, false);

    // Handle on stop recording button
    document.getElementById("stop-btn").addEventListener("click", function() {

            var _AudioFormat = "audio/wav";

            document.getElementById('start-btn').style.visibility = "hidden";
            document.getElementById('stop-btn').style.visibility = "hidden";

            stopRecording(function(AudioBLOB){
                var url = URL.createObjectURL(AudioBLOB);
                var reader = new FileReader();
                reader.readAsDataURL(AudioBLOB);
                reader.onloadend = function() {
                   var base64data = reader.result;
                   base64data = base64data.split(",")[1];
                   var xhr = new XMLHttpRequest();

                   xhr.open('POST', "https://proxy.api.deepaffects.com/audio/generic/api/v2/sync/recognise_emotion?apikey=AqeLJ72S0Nw0xcWuWse2O47q1Q76CFYL", true);
                   xhr.setRequestHeader('content-type', 'application/json');

                    var obj = {"content": base64data, "sampleRate": 8000, "encoding": "wav", "languageCode": "en-US"}

                   xhr.onreadystatechange = function() {
                        if(xhr.readyState == 4 && xhr.status == 200) {
                            var obj = JSON.parse(xhr.responseText);
                            console.log(obj);
                            document.getElementById('detect').style.fontSize = "35px";
                            document.getElementById('detect').innerHTML = "<br/>";

                            for (var i = 0; i < obj.length; i++) {
                                document.getElementById('detect').innerHTML += obj[i].emotion + "<br/>";
                            }
                            
                            
                            //console.log(xhr.responseText);
                            $.post("http://localhost:5000/catchEmotion", {"emotions": obj});
                            document.getElementById("music_page").style="display:inline;";
                            document.getElementById("music_page").style.marginTop = "75px";
                         }
                    }
                   xhr.send(JSON.stringify(obj));

            }
    }, false);


});



/**
 * Patch the APIs for every browser that supports them and check
 * if getUserMedia is supported on the browser.
 *
 */
function Initialize() {
    try {
        // Monkeypatch for AudioContext, getUserMedia and URL
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        // Store the instance of AudioContext globally
        audio_context = new AudioContext;
    } catch (e) {
        alert('No web audio support in this browser!');
    }
}

/**
 * Starts the recording process by requesting the access to the microphone.
 * Then, if granted proceed to initialize the library and store the stream.
 *
 * It only stops when the method stopRecording is triggered.
 */
function startRecording() {
    // Access the Microphone using the navigator.getUserMedia method to obtain a stream
    navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

    navigator.getUserMedia({ audio: true }, function (stream) {
        // Expose the stream to be accessible globally
        audio_stream = stream;
        // Create the MediaStreamSource for the Recorder library
        var input = audio_context.createMediaStreamSource(stream);
        console.log('Media stream succesfully created');

        // Initialize the Recorder Library
        recorder = new Recorder(input);
        console.log('Recorder initialised');

        // Start recording !
        recorder && recorder.record();
        console.log('Recording...');

        // Disable Record button and enable stop button !
        document.getElementById("start-btn").disabled = true;
        document.getElementById("stop-btn").disabled = false;
    }, function (e) {
        console.error('No live audio input: ' + e);
    });
}

/**
 * Stops the recording process. The method expects a callback as first
 * argument (function) executed once the AudioBlob is generated and it
 * receives the same Blob as first argument. The second argument is
 * optional and specifies the format to export the blob either wav or mp3
 */
function stopRecording(callback, AudioFormat) {
    // Stop the recorder instance
    recorder && recorder.stop();
    console.log('Stopped recording.');

    // Stop the getUserMedia Audio Stream !
    audio_stream.getAudioTracks()[0].stop();

    // Disable Stop button and enable Record button !
    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;

    // Use the Recorder Library to export the recorder Audio as a .wav file
    // The callback providen in the stop recording method receives the blob
    if(typeof(callback) == "function"){

        /**
         * Export the AudioBLOB using the exportWAV method.
         * Note that this method exports too with mp3 if
         * you provide the second argument of the function
         */
        recorder && recorder.exportWAV(function (blob) {
            callback(blob);

            // create WAV download link using audio data blob
            // createDownloadLink();

            // Clear the Recorder to start again !
            recorder.clear();
        }, (AudioFormat || "audio/wav"));
    }
}
});