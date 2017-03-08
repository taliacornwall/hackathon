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
}))

function checkAuth (req, res, next) {
  var token = req.session.token;
  if (!token) {
    var url = google.getAuthorizationUrl();
    res.redirect(url);
  } else {
    google.setTokens(token, function () {
      next()
    });
  }
}

app.use(['/postAuth', '/youtube', '/youtubeAll'], checkAuth)

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/postAuth', function (req, res) {
  res.sendFile('public/postAuth.html', { root: __dirname });
});

// app.get('/oauth', (req, res, next)=>{
//   new Promise((resolve, reject) => {
//     get((err)=>{
//       if err reject(err);
//       resolve();
//     })
//   }).then(foo)
//   .then(bar)
//   .catch(next);
// })

app.get('/oauth',function (req, res) {
  var code = req.query.code;
  if (code) {
    req.session.token = code;
    res.redirect('/postAuth');
  } else {
    res.redirect('/');
  }
});

// app.get('/youtube', function(req, res){
//   console.log('Getting youtube data ...');

//   var query = req.query.q;
//   console.log("query:" + query);

// 	var json = youtube.searchVideos(query, "", function(json){
//     res.status(200).json(json);
//   });
// });

app.get('/searchList', function(req, res){
  console.log('Getting youtube data ...');

  var query = req.query.q;
  console.log("query:" + query);

  var json = youtube.searchList({q: query}, function(json){
    res.status(200).json(json);
  });
});

app.get('/videosList', function(req, res){
  console.log('Getting youtube data ...');

  var query = req.query.q;
  console.log("query:" + query);

  var json = youtube.videosList({}, function(json){
    res.status(200).json(json);
  });
});

// app.get('/searchMyChannels', function(req, res){
//   console.log('Getting youtube data ...');

//   var json = youtube.paginatedSearch(query, function(json){
//     res.status(200).json(json);
//   });
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});