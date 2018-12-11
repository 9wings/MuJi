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

var searchTable = {
  "angry": ["angry", "furious", "mad" , "rage" , "annoyance"],
  "disgust": ["yuck", "let", "go" , "boredom"],
  "fear": ["fear", "scary", "freight" , "terror"],
  "neutral": ["you", "normal", "regular"],
  "sad": ["never", "break", "heart" , "alone" , "lonely"],
  "pleasant suprise": ["surprise", "wow","expect", "love"],
  "happy": ["happy", "best", "love" , "like" , "joy" , "ecstacy"]
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var query_string = [];
var list_of_Songs = []
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
      var searchKey;
      var index = Math.floor(Math.random() * 2);
      var emotion = query_string[index]
      if (searchTable[emotion] != undefined) {      
        searchKey = searchTable[emotion][index];
      } else {
        searchKey = emotion;
      }

      spotifyApi.searchTracks(searchKey)
        .then(function(data) {
          var urlExists = false;
          var done = false;
          var counter = 0;
          var index = 0;
          while (!done) {
            if (data.body.tracks.items[index].preview_url == null){
              data.body.tracks.items.splice(index, 1);
            } else {
              index++;
            }
            counter++;

            if (counter == 20) {
              done = true;
            }
          }
          
          res.send(data.body.tracks.items);
        }, function(err) {
          console.error(err);
        });

    },
    (err) => {console.log('Something went wrong when retrieving an access token', err.message); });
});

app.post("/catchEmotion", (req, res) => {
  data = req.body;
  for (var key in data){
    title = key.substring(12, )
    if(title == "emotion]"){
      var feeling = data[key]
      if(feeling in searchTable){
        query_string = query_string.concat( searchTable[feeling]);
        
      }
    }
  }
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
