const express = require('express');
const ejs = require('ejs');

const http = require('http');

const app = express()
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static("public"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/static/index.html");
});

app.get("/general", (req, res) => {

  response = {
    nick : req.query.nick
  };

  res.render("general", {nick:req.query.nick});

  console.log(response);
});