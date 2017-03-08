(function() {

    var key = "0a48d8aba6c849aebd55b35a98f7bfeb";
    var articleKey = '0a48d8aba6c849aebd55b35a98f7bfeb';

    // Create the connector object
    var myConnector = tableau.makeConnector();

    // myConnector.init = function(initCallback) {
    //     tableau.authType = tableau.authTypeEnum.none;   
    // }
    
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var videoCols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "publishedAt",
            alias: "Published",
            dataType: tableau.dataTypeEnum.string            
        },{
            id: "channelId",
            alias: "Channel Id",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "regionCode",
            alias: "Region",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "title",
            alias: "Title",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "description",
            alias: "Description",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "liveBroadcastContent",
            alias: "Live Broadcast Content",
            dataType: tableau.dataTypeEnum.string
        }
        ];

        var videosSchema = {
            id: "videos",
            alias: "Youtube videos",
            columns: videoCols
        };

        var statisticsCols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "viewCount",
            alias: "View Count",
            dataType: tableau.dataTypeEnum.string            
        },{
            id: "likeCount",
            alias: "Like Count",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "dislikeCount",
            alias: "Dislike Count",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "favoriteCount",
            alias: "Favorite Count",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "commentCount",
            alias: "Comment Count",
            dataType: tableau.dataTypeEnum.string
        }
        ];

       var statisticsSchema = {
            id: "statistics",
            alias: "Youtube videos statistiscs",
            columns: statisticsCols
        };

        schemaCallback([videosSchema, statisticsSchema]);
    };

    var storedVideoResult;

    // Download the data
    myConnector.getData = function(table, doneCallback) {

      if (storedVideoResult){
        parseResponse(table, storedVideoResult, doneCallback);
      } else {
        var userInput = JSON.parse(tableau.connectionData);
        $.getJSON(
          "http://localhost:3000/searchList",
          {q: userInput.query}, 
          function(resp) {
            // cache data so we don't have to call twice
            storedVideoResult = resp;
            parseResponse(table, storedVideoResult, doneCallback);
        });
      }
  };

  function parseResponse(table, response, doneCallback){
    if (table.tableInfo.id === "videos"){
      parseVideos(table, response,doneCallback);
    } else {
      parseStatistics(table, response, doneCallback);
    }
  }

  function parseVideos(table, response, doneCallback){

    tableData = [];

    // Iterate over the pages
    $.each(response, function(index, page){

        var items = page.items;
        var region = page.regionCode;

        // Iterate over the JSON object
        $.each(items, function(index, val){
            tableData.push({
                "id": val.id.videoId,
                "publishedAt": val.snippet.publishedAt,
                "channelId": val.snippet.channelId,
                "channelTitle": val.snippet.channelTitle,
                "regionCode": region,
                "title": val.snippet.title,
                "description": val.snippet.description,
                "liveBroadcastContent": val.snippet.liveBroadcastContent
            });
        });
    });

    table.appendRows(tableData);
    doneCallback();
  }

  function parseStatistics(table, response, doneCallback){
    tableData = [];

    $.each(response, function(index, page){
        $.each(page.items, function(index, val){
            tableData.push({
                "id": val.id.videoId,
                "viewCount": val.statistics.viewCount,
                "likeCount": val.statistics.likeCount,
                "dislikeCount": val.statistics.dislikeCount,
                "favoriteCount": val.statistics.favoriteCount,
                "commentCount": val.statistics.commentCount,
            });
        });
    });

    table.appendRows(tableData);
    doneCallback();
  }

  tableau.registerConnector(myConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(function() {
      $("#authButton").click(function() {
          window.location.href = '/postAuth';        
      });
  });

  // Create event listeners for when the user submits the form
  $(document).ready(function() {

    // var query = $('#queryInput').val();
    // var sort = $('.dropdown-menu').val();

    $("#submitButton").click(function() {

      var userInput = {
        query: $('#queryInput').val().trim()
      };

      tableau.connectionData = JSON.stringify(userInput);
      tableau.connectionName = "Youtube"; // This will be the data source name in Tableau
      tableau.submit(); // This sends the connector object to Tableau
    });
  });
})();