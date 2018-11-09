const express = require('express')
const app = express()
const path = require("path")
const PORT = process.env.PORT || 5000

app.get('/',
(req, res) => {
  res.sendFile(path.join(__dirname+'/homepage.html'));
});

app.get("/detection",
(req,res) => {
  res.sendFile(path.join(__dirname+'/detection.html'));
});


app.get("/feeling",
(req,res) => {
  res.sendFile(path.join(__dirname+'/feeling.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

/*
1. fix heroku
2. change detection.html file to fit the needs
3. send the recorded file to server
4. capture the recorded file in the server
5. use it to run the google's semantic api on it
6. print the results
7. we're done!!!
*/
