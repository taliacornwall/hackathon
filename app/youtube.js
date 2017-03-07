var google = require('googleapis');
var oauthClient = require('./oauth2');

// initialize the Youtube API library
var youtube = google.youtube({
  version: 'v3',
  auth: oauthClient.client
});

// a very simple example of searching for youtube videos
function searchYoutube (query, callback) {

  console.log('Searching youtube...')

  youtube.search.list({
    part: 'id,snippet, statistics',
    q: 'Node.js on Google Cloud'
  }, function (err, data) {

    var response;
    if (err) {
      response = {error: + err};
    }
    if (data) {
      response = data;
    }
    console.log(response);
    callback(response);
  });
};

module.exports.searchYoutube = searchYoutube;