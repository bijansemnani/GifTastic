$(document).ready(function() {
  var topics = ["cars","djs","videogames","fortnite","overwatch"];
  renderButtons();
  function renderButtons() {
        $("#topicButton").empty();
        for (var i = 0; i < topics.length; i++) {
          $("#topicButton").append("<button class='topic'>" + topics[i] + "</button>");
        }

  }

  $("#topicButton").on("click","button.topic", function () {
    var topic = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+
    topic+"&api_key=yDCNh74O3PEtUiFjweP41yuQjaffRREA&limit=5";
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (data) {

      for (var i = 0; i < data.data.length; i++) {
        console.log(data.data[i].images.original.url);
        var imageUrl = data.data[i].images.original.url;
        $("#dump").append("<img src='"+imageUrl+"'>");
      }

    })
  });

});
