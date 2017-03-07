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

var rateLimitedPages = 5;

function searchAll(query, pageToken, callback, resultsSoFar){

  search(query, pageToken, function(response){
    resultsSoFar.push(response);
    if (response.nextPageToken && resultsSoFar.length < rateLimitedPages){
      searchAll(query, response.nextPageToken, callback, resultsSoFar);
    } else {
      callback(resultsSoFar);
    }
  });
}

function paginatedSearch(query, callback){
  var results = [];
  searchAll(query, "", callback, results);
}

module.exports.search = search;
module.exports.paginatedSearch = paginatedSearch;