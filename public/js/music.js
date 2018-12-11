var audio, playButton, pauseButton;

initAudioPlayer();

function initAudioPlayer() {
    audio = new Audio();

    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:5000/search", true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            list_data = JSON.parse(request.responseText);
            console.log(list_data)

            data = list_data[0]
            song_name = data.name;
            artist_name = data.artists[0].name; //there are multiple artists but we only care about the name of one artist
            img_url_small = data.album.images[1]; 
            img_url_big = data.album.images[0];
            preview_url = data.preview_url;

            document.getElementById("img_url").src = img_url_big.url;
            document.getElementById("song_name").innerHTML = song_name;
            document.getElementById("artist_name").innerHTML = artist_name;
            audio.src = data.preview_url; 

        } else if (request.readyState == 4 && request.status != 200) {
            console.log("Woops, something went wrong...");
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