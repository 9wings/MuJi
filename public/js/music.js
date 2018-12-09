var audio, playButton, pauseButton;

initAudioPlayer();
// retrieveSong();

function initAudioPlayer() {
    audio = new Audio();

    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:5000/search", true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            document.getElementById("name").innerHTML = JSON.parse(request.responseText).name;
            console.log(JSON.parse(request.responseText).preview_url);
            audio.src = JSON.parse(request.responseText).preview_url;

        } else if (request.readyState == 4 && request.status != 200) {
            console.log("Woops, something went wrong...");
        }
        else if (request.readyState == 3) {
            console.log("Come back soon!");
        }		
    };
    
	playButton = document.getElementById("playB");
	playButton.addEventListener("click", play);

	pauseButton = document.getElementById("pauseB");
	pauseButton.addEventListener("click", pause);

	function play() {
		audio.play();
	}

	function pause() {
		audio.pause();
	}
}