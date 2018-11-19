const express = require('express');
const app = express();
const path = require("path");
var querystring = require('querystring');
var cors = require('cors');
var SpotifyWebApi = require('spotify-web-api-node');
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + '/Script'));

app.get('/',
(req, res) => {
  res.sendFile('/View/homepage.html', { root: __dirname });
});

app.get("/about",
(req,res) => {
  res.sendFile('/View/about.html', { root: __dirname });
});

app.get("/detection",
(req,res) => {
  res.sendFile('/View/detection.html', { root: __dirname });
});

app.post("/audiofile",
(req, res) => {
  /*
  req.body will contain the audio file url
  we'll use that to get the wav file
  after that we will use that file to get the emotion detected from the google's api
  we send the emotion back to the user:
    a. either create a playlist in the backend and send the playlist to frontend
    b. or, sennd the emotion signal and create the playlist in the frontend
  */
  var audiofile = req.body;
});

// create a playlist randomly and send it to frontend based on get request. 
// create a get request that sends the response based on request.body. 
// request.body will contain emotion. for now send a random playlist url

var client_id = 'dbf8b5e4053b4e6dac2ebbead378ee3d'; // Your client id
var client_secret = '97ee8cd484c74d9aa7ecf520eaca71cf'; // Your secret
var redirect_uri = 'localhost:5000/callback'; // Your redirect uri

app.get('/login', function(req, res) {

  var state = "hello";
  // res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

/*
app.get("/spot",
(req,res) => {
  var spotifyApi = new SpotifyWebApi({
    clientId: 'dbf8b5e4053b4e6dac2ebbead378ee3d',
    clientSecret: '97ee8cd484c74d9aa7ecf520eaca71cf',
    redirectUri: 'localhost:5000'
  });

  spotifyApi.createPlaylist('My Cool Playlist', { 'public' : false })
  .then(function(data) {
    console.log('Created playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  res.send([]);
});
*/

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

/*
2. change detection.html file to fit the needs
3. send the recorded file to server
4. capture the recorded file in the server

5. use it to run the google's semantic api on it
6. print the results
7. we're done!!!
*/
