var audio, playButton, pauseButton;

initAudioPlayer();

function initAudioPlayer() {
    

    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:5000/search", true);
    request.send();

    request.onreadystatechange = function() {
        audio = new Audio();
        if (request.readyState == 4 && request.status == 200) {
            list_data = JSON.parse(request.responseText);
            console.log(list_data)

            list_songs = document.getElementById("list_songs")
            
            list_data.forEach(data => {
                var song_name = data.name;
                var artist_name = data.artists[0].name;

                var img_url = data.album.images[0];
                var preview_url = data.preview_url;

                var song_div = document.createElement("div");
                song_div.preview_uri = preview_url;
                song_div.className = "song";
                
                var img = document.createElement("img");      
                img.className = "song_img";
                img.src = img_url.url;
                img.width = 50;
                img.height = 50;
                img.style = "float:left;";

                var artist = document.createElement("h6");
                artist.innerHTML = artist_name;
                var song = document.createElement("h4");
                song.innerHTML = song_name.substring(0,20);

                var details = document.createElement("div");
                details.className = "song_details";
                details.append(song, artist);
                details.style = "float:left; margin-left:10%;";

                song_div.append(img, details);
                list_songs.append(song_div);
            });

            $(document).on("click", ".song", function(){
                console.log($(this))
                document.getElementById("img_url").src = $(this)[0].children[0].currentSrc;
                document.getElementById("song_name").innerHTML = $(this)[0].children[1].children[0].innerHTML;
                document.getElementById("artist_name").innerHTML = $(this)[0].children[1].children[1].innerHTML;
                audio.src = $(this)[0].preview_uri;     
              });

            $('.song').hover(function(){$(this).toggleClass('hovering');});
            $('.song').trigger('click');




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