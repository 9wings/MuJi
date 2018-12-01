$(document).ready( () => {    var audio_context;
    var recorder;
    var audio_stream;

    // Prepare and check if requirements are filled
    Initialize();

    // Handle on start recording button
    document.getElementById("start-btn").addEventListener("click", function(){
        startRecording();
    }, false);

    // Handle on stop recording button
    document.getElementById("stop-btn").addEventListener("click", function(){
        var _AudioFormat = "audio/wav";
        // You can use mp3 to using the correct mimetype
        //var AudioFormat = "audio/mpeg";

        stopRecording( (AudioBLOB)=>{
          $.ajax({
            type: 'POST',
            url: "http://localhost:5000/audiofile",
            data: AudioBLOB,
            processData: false,
            contentType: false
        }).done(
          ( data ) => {

              //process data here!
          });


            // Note:
            // Use the AudioBLOB for whatever you need, to download
            // directly in the browser, to upload to the server, you name it !

            // In this case we are going to add an Audio item to the list so you
            // can play every stored Audio
            var url = URL.createObjectURL(AudioBLOB);
            //console.log(AudioBLOB);
            var li = document.createElement('li');
            var au = document.createElement('audio');
            var hf = document.createElement('a');

            var reader = new FileReader();
            reader.readAsDataURL(AudioBLOB); 
            reader.onloadend = function() {
               var base64data = reader.result;
               base64data = base64data.split(",")[1];
               // alert(base64data);

                var obj = {"content": "bytesEncodedAudioString", "sampleRate": 8000, "encoding": "wav", "languageCode": "en-US"}
                



                //console.log(obj);

                // $.post({
                //      url: "https://proxy.api.deepaffects.com/audio/generic/api/v2/sync/recognise_emotion?apikey=5X5lEg0RWvfQp1xA7xW47QjVgYXEUl28n",
                //      data: obj,
                //      type: "POST",
                //      beforeSend: function(xhr){xhr.setRequestHeader('content-type', 'application/json');},
                //      success: function(data) { console.log("data"); }
                //   });

                /*
                curl -X POST "https://proxy.api.deepaffects.com/audio/generic/api/v2/sync/recognise_emotion?apikey=5X5lEg0RWvfQp1xA7xW47QjVgYXEUl28" -H 'content-type: application/json' -d @data.json

                */
               var xhr = new XMLHttpRequest();
               // $.post( "https://proxy.api.deepaffects.com/audio/generic/api/v2/sync/recognise_emotion?apikey=5X5lEg0RWvfQp1xA7xW47QjVgYXEUl28", obj
               //      //$( ".result" ).html( data );
               //  ).done(function(data){
               //      console.log("hi");
               //      console.log(data);
               //  });


               xhr.open('POST', "https://proxy.api.deepaffects.com/audio/generic/api/v2/sync/recognise_emotion?apikey=5X5lEg0RWvfQp1xA7xW47QjVgYXEUl28", true);
               xhr.setRequestHeader('content-type', 'application/json');
               
               xhr.onreadystatechange = function() {//Call a function when the state changes.
                    //if(xhr.readyState == 4 && xhr.status == 200) {
                        console.log(xhr.responseText);
                    // }
                    // else{
                    //     console.log("error");
                    // }
                }

                alert(obj.content);
               xhr.send(obj);
               //alert(xhr.responseText);

            }

            au.controls = true;
            au.src = url;
            hf.href = url;
            // Important:
            // Change the format of the file according to the mimetype
            // e.g for audio/wav the extension is .wav
            //     for audio/mpeg (mp3) the extension is .mp3
            hf.download = new Date().toISOString() + '.wav';
            hf.innerHTML = hf.download;
            li.appendChild(au);
            li.appendChild(hf);
            recordingslist.appendChild(li);}, _AudioFormat);
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
        console.log('Audio context is ready !');
        console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
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
