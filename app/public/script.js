// import videoCols from './helpers';
(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {

      // var videoCols = [{
      //       id: "id",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "publishedAt",
      //       alias: "Published",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "channelId",
      //       alias: "Channel Id",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "regionCode",
      //       alias: "Region",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "title",
      //       alias: "Title",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "description",
      //       alias: "Description",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "liveBroadcastContent",
      //       alias: "Live Broadcast Content",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "viewCount",
      //       alias: "View Count",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "likeCount",
      //       alias: "Like Count",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "dislikeCount",
      //       alias: "Dislike Count",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "favoriteCount",
      //       alias: "Favorite Count",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "commentCount",
      //       alias: "Comment Count",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "tags",
      //       alias: "Tags",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "player",
      //       alias: "Player",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "topicIds",
      //       alias: "Topic Ids",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "topicCategories",
      //       alias: "Topic Categories",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "duration",
      //       alias: "Duration",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "dimension",
      //       alias: "Dimension",
      //       dataType: tableau.dataTypeEnum.string
      //   }, {
      //       id: "definition",
      //       alias: "Definition",
      //       dataType: tableau.dataTypeEnum.string
      //   }];
    
        var videosSchema = {
            id: "videos",
            alias: "Youtube videos",
            columns: [{
              id: "id",
              dataType: tableau.dataTypeEnum.string
            }]
        };

        schemaCallback([videosSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

      // var userInput = JSON.parse(tableau.connectionData);

      // $.getJSON(
      //   "http://localhost:3000/searchList",
      //   {q: userInput.query}, 
      //   function(resp) {
          
      //     var tableData = [];
      //     // var promises = [];

      //     // Iterate over the pages
      //     // $.each(resp, function(index, page){

      //     //     var items = page.items;
      //     //     var region = page.regionCode;

      //     //     // Iterate over the JSON object
      //     //     $.each(items, function(index, val){
      //     //       // NOT WORKING
      //     //       promises.push(getVideoDetails(tableData, val.id.videoId));
      //     //     });
      //     // });

      //     doneCallback();

      //     // Promise.all(promises).then(function(){
      //     //     // NOT WORKING
      //     //     table.appendRows(tableData);
      //     //     doneCallback();
      //     // }).catch(function(e){
      //     //   doneCallback();
      //     // });
      // });

      doneCallback();
  };

  // function getVideoDetails(tableData, id) {
  //   return new Promise(function(resolve, reject) {
  //     $.getJSON(
  //       "http://localhost:3000/videosList",
  //       {id: id}, 
  //       function(resp) {
  //         if (resp.length > 0 && resp[0].items && resp[0].items.length > 0){
  //           var val = resp[0].items[0];
  //           var video = {}
  //           video.id = id;
  //           if (val.snippet){
  //               video.publishedAt = val.snippet.publishedAt;
  //               video.channelId = val.snippet.channelId;
  //               video.channelTitle = val.snippet.channelTitle;
  //               video.title = val.snippet.title;
  //               video.description = val.snippet.description;
  //               video.liveBroadcastContent = val.snippet.liveBroadcastContent;
  //               video.tags = val.snippet.tags;
  //           }
  //           if (val.statistics){
  //               video.viewCount = val.statistics.viewCount;
  //               video.likeCount = val.statistics.likeCount;
  //               video.dislikeCount = val.statistics.dislikeCount;
  //               video.favoriteCount = val.statistics.favoriteCount;
  //               video.commentCount = val.statistics.commentCount;
  //           }
  //           if (val.contentDetails){
  //             video.duration = val.contentDetails.duration;
  //             video.dimension = val.contentDetails.dimension;
  //             video.definition = val.contentDetails.definition;
  //           }
  //           if (val.player){
  //             video.player = val.player.embedHtml;
  //           }

  //           tableData.push(video);
  //         }
  //         resolve();
  //       }); 
  //   }, tableData, id);
  // }

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

    $("#submitButton").click(function() {

      // var userInput = {
      //   query: $('#queryInput').val().trim()
      // };

      // tableau.connectionData = JSON.stringify(userInput);
      tableau.connectionName = "Youtubes"; // This will be the data source name in Tableau
      tableau.submit(); // This sends the connector object to Tableau
    });
  });
})();