var google = require('googleapis');
var oauthClient = require('./oauth2');

// initialize the Youtube API library
var youtube = google.youtube({
  version: 'v3',
  auth: oauthClient.client
});

var searchChannels = function(pageToken, callback) {
  console.log('Searching youtube channels...')

  youtube.channels.list({
    part: 'id,snippet',
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

var searchVideos = function(query, pageToken, callback) {

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

var rateLimitedPages = 1;

function searchAll(apiCall, query, pageToken, callback, resultsSoFar){

  apiCall(query, pageToken, function(response){
    resultsSoFar.push(response);
    if (response.nextPageToken && resultsSoFar.length < rateLimitedPages){
      searchAll(query, response.nextPageToken, callback, resultsSoFar);
    } else {
      callback(resultsSoFar);
    }
  });
}

function paginatedSearch(query, callback){
  console.log('Searching youtube...')

  var results = [];
  searchAll(searchVideos, query, "", callback, results);
}

function paginatedSearchChannels(query, callback){
  var results = [];
  searchAll(searchChannels, "", "", callback, results);
}

module.exports.searchVideos = searchVideos;
module.exports.paginatedSearch = paginatedSearch;

module.exports.paginatedSearchChannels = paginatedSearchChannels;
