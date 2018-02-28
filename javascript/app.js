$(document).ready(function() {
  var topics = ["cars","djs","videogames","fortnite","overwatch"];

  renderButtons();

  //initial function to render the given buttons
  function renderButtons() {
    console.log(topics);
    $("#topicButton").empty();
    for (var i = 0; i < topics.length; i++) {
      $("#topicButton").append("<button class='topic'>"
      + topics[i] + "</button>");
    }
  }

  function splitValue(value, index) {
    return [value.substring(0, index),value.substring(index)];
  }

  $("#add-topic").on("click",function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val();
    $("#topic-input").val("");
    topics.push(topic);
    renderButtons();
  });

  $("#topicButton").on("click","button.topic", function () {
    //get the topic name from the button then set up the queryUrl
    var topic = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+
    topic+"&api_key=yDCNh74O3PEtUiFjweP41yuQjaffRREA&limit=10";

    //make the ajax call to get json info
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (data) {
      $("#dump").empty();
      console.log(data);
      //traverse the json info and print the images
      for (var i = 0; i < data.data.length; i++) {
        //get imageUrl then split it to the url and the extension
        var imageUrl = data.data[i].images.original.url;
        var split = splitValue(imageUrl, imageUrl.length-4);

        //replace the extension with _s.gif then join the url
        split[1]="_s.gif";
        split = split.join('');
        var p = $("<p>");
        p.append("Rated: " + data.data[i].rating);
        //display the images on the page
        $("#dump").append("<img data-state='still' id='gif' class='gifs' src='"+split+"'>");
        $("#dump").append(p);

      }
    });
  });

  //when user clicks on gif it either pauses or plays
  $("#dump").on("click","img.gifs", function () {
    //get the state and url from the button click
    var state = $(this).attr("data-state");
    var url = $(this).attr("src");

    //if the state is still play the gif
    if(state === "still"){
      //set the data-state to be animate
      $(this).attr("data-state","animate");

      //split the url and change the extension to .gif then join
      var split = splitValue(url, url.length-6);
      split[1] = ".gif";
      url = split.join('');

      //set the img src to the new url
      $(this).attr("src",url);
    }
    //if the state is animate then pause the gif
    else{
      //set the data-state to be still
      $(this).attr("data-state","still");

      //split the url and change the extension to _s.gif then join
      var split = splitValue(url, url.length-4);
      split[1] = "_s.gif";
      url = split.join('');

      //set the img src to the new url
      $(this).attr("src",url);
    }
  });

});
