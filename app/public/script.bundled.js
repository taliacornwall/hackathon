/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    id: "id",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "publishedAt",
    alias: "Published",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "channelId",
    alias: "Channel Id",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "regionCode",
    alias: "Region",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "title",
    alias: "Title",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "description",
    alias: "Description",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "liveBroadcastContent",
    alias: "Live Broadcast Content",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "viewCount",
    alias: "View Count",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "likeCount",
    alias: "Like Count",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "dislikeCount",
    alias: "Dislike Count",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "favoriteCount",
    alias: "Favorite Count",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "commentCount",
    alias: "Comment Count",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "tags",
    alias: "Tags",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "player",
    alias: "Player",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "topicIds",
    alias: "Topic Ids",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "topicCategories",
    alias: "Topic Categories",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "duration",
    alias: "Duration",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "dimension",
    alias: "Dimension",
    dataType: tableau.dataTypeEnum.string
}, {
    id: "definition",
    alias: "Definition",
    dataType: tableau.dataTypeEnum.string
}];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myConnector = tableau.makeConnector();

myConnector.getSchema = function (schemaCallback) {

  var videosSchema = {
    id: "videos",
    alias: "Youtube videos",
    columns: _helpers2.default
  };

  schemaCallback([videosSchema]);
};

myConnector.getData = function (table, doneCallback) {

  var userInput = JSON.parse(tableau.connectionData);

  $.getJSON("http://localhost:3000/searchList", { q: userInput.query }, function (resp) {

    var tableData = [];
    var promises = [];

    $.each(resp, function (index, page) {

      var items = page.items;
      var region = page.regionCode;

      $.each(items, function (index, val) {
        promises.push(getVideoDetails(tableData, val.id.videoId));
      });
    });

    Promise.all(promises).then(function () {
      doneCallback();
    }).catch(function (e) {
      doneCallback();
    });
  });
};

function getVideoDetails(tableData, id) {
  return new Promise(function (resolve, reject) {
    $.getJSON("http://localhost:3000/videosList", { id: id }, function (resp) {
      if (resp.length > 0 && resp[0].items && resp[0].items.length > 0) {
        var val = resp[0].items[0];
        var video = {};
        video.id = id;
        if (val.snippet) {
          video.publishedAt = val.snippet.publishedAt;
          video.channelId = val.snippet.channelId;
          video.channelTitle = val.snippet.channelTitle;
          video.title = val.snippet.title;
          video.description = val.snippet.description;
          video.liveBroadcastContent = val.snippet.liveBroadcastContent;
          video.tags = val.snippet.tags;
        }
        if (val.statistics) {
          video.viewCount = val.statistics.viewCount;
          video.likeCount = val.statistics.likeCount;
          video.dislikeCount = val.statistics.dislikeCount;
          video.favoriteCount = val.statistics.favoriteCount;
          video.commentCount = val.statistics.commentCount;
        }
        if (val.contentDetails) {
          video.duration = val.contentDetails.duration;
          video.dimension = val.contentDetails.dimension;
          video.definition = val.contentDetails.definition;
        }
        if (val.player) {
          video.player = val.player.embedHtml;
        }

        tableData.push(video);
      }
      resolve();
    });
  }, tableData, id);
}

tableau.registerConnector(myConnector);

$(document).ready(function () {
  $("#authButton").click(function () {
    window.location.href = '/postAuth';
  });
});

$(document).ready(function () {

  var query = $('#queryInput').val();

  $("#submitButton").click(function () {

    var userInput = {
      query: $('#queryInput').val().trim()
    };

    tableau.connectionData = JSON.stringify(userInput);
    tableau.connectionName = "Youtubes";
    tableau.submit();
  });
});

/***/ })
/******/ ]);