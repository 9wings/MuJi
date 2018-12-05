/*
Shows the innerworkings of the DeepAffects
*/
var DeepAffects = require("deep-affects");

var UserSecurity = defaultClient.authentications["UserSecurity"];
UserSecurity.apiKey = "5X5lEg0RWvfQp1xA7xW47QjVgYXEUl28";

var apiInstance = new DeepAffects.DenoiseApi();

var body = DeepAffects.Audio.fromFile("/home/tuftscs/Desktop/DummyAudio.m4a"); // {Audio} Audio object

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully. Returned data: " + data);
  }
}
apiInstance.syncDenoiseAudio(body, callback);
