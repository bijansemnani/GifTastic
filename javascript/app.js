$(document).ready(function() {
  var topics = ["cars","djs","videogames","fortnite","overwatch"];
  renderButtons();

  function renderButtons() {
        $("#topicButton").empty();
        for (var i = 0; i < topics.length; i++) {
          $("#topicButton").append("<button class='topic'>" + topics[i] + "</button>");
        }
  }

  function splitValue(value, index) {
    console.log(value.substring(0, index));
    console.log(value.substring(index));
    return [value.substring(0, index),value.substring(index)];
  }

  $("#topicButton").on("click","button.topic", function () {
    var topic = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+
    topic+"&api_key=yDCNh74O3PEtUiFjweP41yuQjaffRREA&limit=10";
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (data) {
      $("#dump").empty();
      for (var i = 0; i < data.data.length; i++) {
        var imageUrl = data.data[i].images.original.url;
        var split = splitValue(imageUrl, imageUrl.length-4);
        split[1]="_s.gif";
        split = split.join('');
        $("#dump").append("<img data-state='still' id='gif' class='gifs' src='"+split+"'>");
      }
    });
  });

  $("#dump").on("click","img.gifs", function () {
    console.log("here");
    var state = $(this).attr("data-state");
    var url = $(this).attr("src");
    if(state === "still"){
      $(this).attr("data-state","animate");
      var split = splitValue(url, url.length-6);
      console.log(split);
      split[1] = ".gif";
      url = split.join('');
      console.log(url);
      $(this).attr("src",url);
    }
    else{
      $(this).attr("data-state","still");
      var split = splitValue(url, url.length-4);
      console.log(split);
      split[1] = "_s.gif";
      url = split.join('');
      console.log(url);
      $(this).attr("src",url);
    }
  });

});
