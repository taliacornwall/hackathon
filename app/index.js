var express = require('express');
var google = require('./oauth2');
var youtube = require('./youtube');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/postAuth', function (req, res) {
  res.sendFile('public/postAuth.html', { root: __dirname });
});

app.get('/oauth', function (req, res) {

  var code = req.query.code;

  if (code) {
  	google.setTokens(code, function () {
      res.redirect('/postAuth');
  	});
  } else {
    var url = google.getAuthorizationUrl();
    res.redirect(url);
  }
});

app.get('/youtube', function(req, res){
  console.log('Getting youtube data ...');

	var json = youtube.searchYoutube("", function(json){
    res.status(200).json(json);
  });
});