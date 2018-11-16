const express = require('express')
const app = express()
const path = require("path")
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

app.get("/spot",
(req,res) => {
  var spotifyApi = new SpotifyWebApi({
    clientId: 'dbf8b5e4053b4e6dac2ebbead378ee3d',
    clientSecret: '97ee8cd484c74d9aa7ecf520eaca71cf'
    redirectUri: ''
  });

  spotifyApi.createPlaylist('My Cool Playlist', { 'public' : false })
  .then(function(data) {
    console.log('Created playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  res.send([]);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

/*

2. change detection.html file to fit the needs
3. send the recorded file to server
4. capture the recorded file in the server

5. use it to run the google's semantic api on it
6. print the results
7. we're done!!!
*/
