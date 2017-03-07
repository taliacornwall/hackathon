var google = require('googleapis');
var oauthClient = require('./oauth2');

// initialize the Youtube API library
var youtube = google.youtube({
  version: 'v3',
  auth: oauthClient.client
});

function search(query, pageToken, callback) {
  console.log('Searching youtube...')

  youtube.search.list({
    part: 'id,snippet',
    q: query,
    pageToken: pageToken
  }, function (err, data) {

    var response;
    if (err) {
      response = {error: + err};
      console.log(err);
    }
    if (data) {
      response = data;
    }
    callback(response);
  });
};

function paginatedSearch(query, pageToken, callback){

  var results = [];

  search(query, "", function(response){
    results.push(response);
    callback(results);
  });
}

module.exports.search = search;
module.exports.paginatedSearch = paginatedSearch;