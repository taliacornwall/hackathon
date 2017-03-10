var express = require('express');
var app = express();
var google = require('./oauth2');
var youtube = require('./youtube');
var path = require('path');
var session = require('express-session')

app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
  secret: 'this is so secret',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/oauth',function (req, res) {
  var code = req.query.code;
  if (code) {
    req.session.token = code;
    res.redirect('/postAuth');
  } else {
    res.redirect('/');
  }
});

app.get('/searchList', function(req, res){
  console.log('Getting youtube data ...');

  var query = req.query.q;
  console.log("query:" + query);

  var params = {};
  params.q = query;
  params.pageLimit = req.query.pageLimit;

  console.log(JSON.stringify(params));
  console.log(JSON.stringify(req.query));

  if (req.query.region && req.query.region !== "All"){
    params.regionCode = req.query.region;
  }

  var json = youtube.searchList(params, function(json){
    res.status(200).json(json);
  });
});

app.get('/videosList', function(req, res){
  console.log('Getting youtube data ...');

  var videoId = req.query.id;
  console.log("video id:" + videoId);

  var json = youtube.videosList({id: videoId, pageLimit: req.query.pageLimit}, function(json){
    res.status(200).json(json);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
