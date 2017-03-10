var google = require('googleapis');
var oauthClient = require('./oauth2');

// limiting to avoid exceeding google quota
var RATE_LIMITED_PAGES = 5;

// initialize the Youtube API library
var youtube = google.youtube({
  version: 'v3',
  auth: oauthClient.key
});

function _channelsList(params, callback) {

  var extendedParams = Object.assign({}, params, {
    part: 'id,snippet'
  })

  console.log('Searching channels list with params' + JSON.stringify(extendedParams));

  youtube.channels.list(
    extendedParams, 
    function (err, data) {

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

function _searchList (params, callback) {

  var extendedParams = Object.assign({}, params, {
    part: 'id',
  })

  console.log('Searching search list with params' + JSON.stringify(extendedParams));

  youtube.search.list(
    extendedParams,
    function (err, data) {

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

function _videosList (params, callback) {

  var extendedParams = Object.assign({}, params, {
    part: 'id, snippet, statistics, contentDetails,player, topicDetails'
  })

  console.log('Searching videos list with params' + JSON.stringify(extendedParams));

  youtube.videos.list(
    extendedParams,
    function (err, data) {

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

// performs paginated search for any API call
function _paginatedSearch(apiCall, params, callback, resultsSoFar){

  if (!resultsSoFar){
    resultsSoFar = [];
  }

  apiCall(params, function(response){
    resultsSoFar.push(response);
    if (response.nextPageToken && 
      resultsSoFar.length < RATE_LIMITED_PAGES && 
      resultsSoFar.length < parseInt(params.pageLimit)){
      params.pageToken = response.nextPageToken;
      _paginatedSearch(apiCall, params, callback, resultsSoFar);
    } else {
      callback(resultsSoFar);
    }
  });
}

function searchList(params, callback){
  console.log('Searching youtube...')
  _paginatedSearch(_searchList, params, callback);
}

function videosList(params, callback){
  console.log('Searching youtube for videos...')
  _paginatedSearch(_videosList, params, callback);
}

module.exports.searchList = searchList;
module.exports.videosList = videosList;