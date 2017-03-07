// Copyright 2012-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var util = require('util');
var readline = require('readline');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '340113640761-1l78ovnpcbn4nv54u3rf5qj5n95po5rl.apps.googleusercontent.com';
var CLIENT_SECRET = 'GH-RQ3PWpjJZqiRVjqEEeu0N';
var REDIRECT_URL = 'http://localhost:3000/oauth';
var API_KEY = 'AIzaSyAX3-iadtDzHYBtpo1AAcfgZxOPCU6Sx5I'; // specify your API key here

var client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAuthorizationUrl(){
  return getAccessToken(client);
}

function getAccessToken (client, callback) {
  // generate consent page url
  return client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: [
      'https://www.googleapis.com/auth/youtube'
    ] 
  });
}

function setTokens(code, callback){
  client.getToken(code, function (err, tokens) {
      if (err) {
        callback(err);
      } else {
        // set tokens to the client
        // TODO: tokens should be set by OAuth2 client.
        client.setCredentials(tokens);
        callback();
      }
  });
}

module.exports.setTokens = setTokens;
module.exports.getAuthorizationUrl = getAuthorizationUrl;
module.exports.client = client;