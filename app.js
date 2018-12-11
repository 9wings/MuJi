const express = require('express');
const app = express();
const path = require("path");
var request = require('request');
var querystring = require('querystring');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var spotifyWebAPI = require('spotify-web-api-node');

var credentials;
var spotifyApi;
var client_id = "f4197e7c7e16424796aeddab09673434";
var client_secret = "f7d26f4a74f44a439b571086aabf2934";

var searchTable = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var emotion;

const PORT = process.env.PORT || 5000

app.use('/static', express.static(path.join(__dirname, 'public')))
   .use(cors())
   .use(cookieParser());

app.get('/',
(req, res) => {
  res.sendFile('public/views/homepage.html', { root: __dirname });
});

app.get("/about",
(req,res) => {
  res.sendFile('public/views/about.html', { root: __dirname });
});

app.get("/detection",
(req,res) => {
  res.sendFile('public/views/detection.html', { root: __dirname });
});

app.get("/music",
(req,res) => {
  res.sendFile('public/views/music.html', { root: __dirname });
});

app.get('/search', (req, res) => {
  credentials = {
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: 'http://localhost.com:5000/'
    };
  
  spotifyApi = new spotifyWebAPI(credentials);
  spotifyApi.clientCredentialsGrant().then(
    (data) => {
      spotifyApi.setAccessToken(data.body['access_token']);

      spotifyApi.searchTracks(emotion)
        .then(function(data) {
          res.send(data.body.tracks.items);
        }, function(err) {
          console.error(err);
        });

    },
    (err) => {console.log('Something went wrong when retrieving an access token', err.message); });
});

app.post("/catchEmotion", (req, res) => {
  emotion = req.body['emotions[0][emotion]'];
  console.log(emotion);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
