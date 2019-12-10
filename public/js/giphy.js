$(document).ready(function () {
    console.log("ready!");



    

    function displaytopicInfo() {

        var topic = $("#search-bar").val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=vqrHAjf6lQWX7tH5y6TbrT30Q6qkO7un&limit=9";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            // Creating a div to hold the topic
            var topicDiv = $("<div class='topic'>");
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r") {

                
                    var image = $('<img height="100" width="100">')
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url)
                    image.attr("data-state", "still")
                    image.addClass("gif");
                    topicDiv.append(image);
                    $("#topics-view").prepend(topicDiv);
                }
            }
        });
    }

   
    // This function handles events where a topic button is clicked
    $("#search").on("click", function (event) {
        event.preventDefault();     
    });

    // Adding a click event listener to all elements with a class of "topic-btn"
    $(document).on("click", "#search", displaytopicInfo);
    

    // Adding play/ pause
    $("#topics-view").on("click", ".gif", function (event) {
        event.preventDefault();
        console.log("been clicked")

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })


});