
var DeepAffects = require("deep-affects");
//var defaultClient = DeepAffects.ApiClient.instance;

// Configure API key authorization: UserSecurity
var UserSecurity = defaultClient.authentications["UserSecurity"];
UserSecurity.apiKey = "5X5lEg0RWvfQp1xA7xW47QjVgYXEUl28";

var apiInstance = new DeepAffects.DenoiseApi();

//GET AUDIO FILE FROM DETECTION.JS
var body = DeepAffects.Audio.fromFile("/home/tuftscs/Desktop/DummyAudio.m4a"); // {Audio} Audio object

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully. Returned data: " + data);
  }
}

// sync request
apiInstance.syncDenoiseAudio(body, callback);


//webhook = "http://muji.herokuapp.com/";
// // async request
// apiInstance.asyncDenoiseAudio(body, webhook, callback);

//127.0.0.1:8000
//apiInstance.listen(process.env.PORT || 8000);


// //using empath
// var fs = require('fs');
// var request = require('request');

// function analyzeWav(apiKey, wavFilename) {
// 	//heroku app
//   var url = 'https://hogehoge_server/v2/analyzeWav';
//   var formData = {
//     apikey: 	'bt_NJweXqWavBvytzK2W-uPu7IHKFJDUdzZRyUz-dhI',
//     wav: fs.createReadStream(wavFilename)
//   };

//   request.post({ url: url, formData: formData }, function(err, response) {
//     if (err) {
//       console.trace(err);
//       return;
//     } else if (!response.body) {
//       console.trace("no response body");
//       return;
//     }

//     var result = JSON.parse(response.body);
//     console.log("result: " + JSON.stringify(result));
//   });
// }


