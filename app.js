const express = require('express')
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + '/Script'));

app.get('/',
(req, res) => {
  res.sendFile('/View/homepage.html', { root: __dirname });
});

app.get("/detection",
(req,res) => {
  res.sendFile('/View/detection.html', { root: __dirname });
});


app.get("/feeling",
(req,res) => {
  res.sendFile('/feeling.html', { root: __dirname });
});

app.post("/audiofile",
(req, res) => {
  console.log("Hello!");
  var audiofile = req.body;
  res.send(req.body);

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
