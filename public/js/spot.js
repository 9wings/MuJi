retrieveSong();

function retrieveSong() {
    // window.onSpotifyWebPlaybackSDKReady = () => {
    //     // You can now initialize Spotify.Player and use the SDK
    // };

    // const play = ({
    //     spotify_uri,
    //     playerInstance: {
    //       _options: {
    //         getOAuthToken,
    //         id
    //       }
    //     }
    //   }) => {
    //     getOAuthToken(access_token => {
    //       fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ uris: [spotify_uri] }),
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${access_token}`
    //         },
    //       });
    //     });
    //   };
      
    //   play({
    //     playerInstance: new Spotify.Player({ name: "..." }),
    //     spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
    //   });

    app.get('/login', function(req, res) {
        var scopes = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' + my_client_id +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' + encodeURIComponent(redirect_uri));
        });

    request = new XMLHttpRequest();
    request.open("GET", "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist", true);
    request.send();

    // var data = {};
    // data.username = username;
    // data.score = this.score;
    // data.grid = this.grid;
    // var json = JSON.stringify(data);
    // request.send(json);

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