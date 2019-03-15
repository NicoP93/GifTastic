$(document).ready(function () {

  var AnimalsArray = ["Dog", "Cat", "Hamster", "Lion"];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//for loop to make a new button with data-animal attribute 

  function renderButtons() {

    $("#buttons-view").empty(); //

    for (var i = 0; i < AnimalsArray.length; i++) {

      var NewButton = $("<button>");

      NewButton.attr("data-animal", AnimalsArray[i]);

      NewButton.text(AnimalsArray[i]); //generates buttons and add the data-animal to them 

      $("#buttons-view").append(NewButton);
    }
  }

/////////////////////////////////////////////////////////////////////////////
//On click event to take user input and push to the array

  $("#add-Animal").on("click", function (event) { //when add button is clicked
    event.preventDefault(); //dont refresh the page
    // This line grabs the input from the textbox
    var UserInput = $("#Animal-input").val().trim(); //take the input
    
    // Adding Animal from the textbox to our array
    AnimalsArray.push(UserInput); //add it to the list

    // Calling renderButtons which handles the processing of our Animal array
    renderButtons();
  });

  renderButtons();



////////////////////////////////////////////////////////////////////////////
//ajax queryurl with our animal butttons and for loops to populate page from the button 
  $("#buttons-view").on("click", "button", function () {
    event.preventDefault();
    // In this case, the "this" keyword refers to the button that was clicked
    var animal = $(this).attr("data-animal");
    
    // Constructing a URL to search Giphy for the name of the animal who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function (response) {
      
        var results = response.data;
        
        

        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r") {
            var gifDiv = $("<div>"); //create a variable that will be a new div
            var animalImage = $("<img>"); //make an img tag
            gifDiv.append(animalImage);
            $("#gifs-appear-here").prepend(gifDiv);
            animalImage.attr("class", "gif");//this is necessary to pause the gif
            animalImage.attr("data-state", "still");
            animalImage.attr("data-animated", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("src", results[i].images.fixed_height.url);
////////////////////////////////////////////////////////////// :_( 



            var rating = response.data[i].rating;  
            var pOne = $("<p>").text("Rating: " + rating);
          // Displaying the rating
            gifDiv.append(pOne);

          

          }//The gifts will pause but wont unpause 
        }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//on click function to pause and unpause, we can puase the images but it wont unpause 
     
        $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      });
  });
});