const express = require('express')
const app = express()
const path = require("path")

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

app.listen(8080, '127.0.0.1')
