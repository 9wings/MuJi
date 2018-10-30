var audio, playButton, pauseButton;

initAudioPlayer();

function initAudioPlayer() {
	audio = new Audio();
	audio.src = "name_of_the_file";
	audio.loop = true;

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