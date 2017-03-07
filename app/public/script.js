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
        var cols = [{
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
            id: "channelTitle",
            alias: "Channel Title",
            dataType: tableau.dataTypeEnum.string
        }
        ];

        var tableSchema = {
            id: "articles",
            alias: "Youtube data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
      var query = $('#queryInput').val();

      $.getJSON(
        "http://localhost:3000/youtubeAll",
        {queryTerm: query}, 
        function(resp) {

          tableData = [];

          // Iterate over the pages
          $.each(resp, function(index, page){

              var items = page.items;

              // Iterate over the JSON object
              $.each(items, function(index, val){
                  tableData.push({
                      "id": val.id.videoId,
                      "publishedAt": val.snippet.publishedAt,
                      "channelId": val.snippet.channelId,
                      "channelTitle": val.snippet.channelTitle,
                  });
              });
          });
          table.appendRows(tableData);
          doneCallback();
      });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#authButton").click(function() {
            window.location.href = '/oauth';        
        });
    });

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Youtube"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();