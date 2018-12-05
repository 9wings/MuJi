var audio, playButton, pauseButton;

initAudioPlayer();
retrieveSong();

function initAudioPlayer() {
	audio = new Audio();
	audio.src = "name_of_the_file";

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

function retrieveSong() {
    
    request = new XMLHttpRequest();
    request.open("GET", "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist", true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText);			
        } else if (request.readyState == 4 && request.status != 200) {
            console.log("Woops, something went wrong...");
        }
        else if (request.readyState == 3) {
            console.log("Come back soon!");
        }		
    };
}