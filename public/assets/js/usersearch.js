$(document).ready(function() {
  $('#submit').on('click', function(e) {
    $('#results').empty();
    //gather search parameters
    var searchResults = {
    item : $('#itemSearch').val().trim(),
    category : $('#category').val().trim(),
    location : $('#locationSearch').val().trim(),
    dayFrom : $('#day').val().trim(),
    dayTo : $('#daytwo').val().trim()
    }
    console.log(searchResults);
    e.preventDefault();
    //ajax GET request for search results
    $.ajax({
      url : "/api/rental/",
      method: "GET"
    }).then(function(data) {
      console.log(data);
      for (i = 0; i < data.length; i++) {
        var name = data[i].username;
        var item = data[i].item;
        var category = data[i].category;
        var describe = data[i].description;
        var location = data[i].location;
        var rate = data[i].rate;
        var imgURL = data[i].imgURL;
        var owner = data[i].owner;
        //generate search query cards
        if ((searchResults.location === location) || (searchResults.item === item) || (searchResults.category === category)){
          var newCard = $("<div>");
            newCard.addClass("card newCard");
            newCard.attr("id", "newCard");
          var newImg = $("<img>");
            newImg.addClass("card-img-top");
            newImg.attr("src", imgURL);
          var cardTitle = $("<h4>");
            cardTitle.addClass("card-title");
              cardTitle.append(item);
          var newUL = $("<ul>");
            newUL.addClass("list-group list-group-flush");
          var description = $("<li>");
            description.addClass("list-group-item");
            description.attr("id", "describe");
              description.html(describe);
          var cat = $("<li>");
            cat.addClass("list-group-item");
              cat.html(category);
          var ra = $("<li>");
            ra.addClass("list-group-item");
              ra.html(rate);
          var loc = $("<li>");
            loc.addClass("list-group-item");
              loc.html(location);
          var na = $("<li>");     
            na.addClass("list-group-item");
              na.html(owner);
          var button = $("<button>");
            button.addClass("btn btn-primary mb-2 rentItem");
            //button.attr("id", "rentItem");
            button.html("Rent This Item");
          newUL.append(describe, cat, ra, loc, na);
          newCard.append(newImg, cardTitle, newUL, button);
          $('#results').append(newCard);
          onClickEvent();
        }
      }
    });
  });
});
function onClickEvent () {
  $('.rentItem').on('click', function() {
    console.log("clicked");
    $('#confirmRentModal').css("display", 'block');
    $('#mainCard').css("display", "none");
    $('.newCard').css("display", "none");
    $('body').css("background", "rgba(0,0,0,.5)" ); 
      $('#no').on('click', function() {
        $('#confirmRentModal').css("display", "none");
        $('#mainCard').css("display", "flex");
        $('.newCard').css("display", "inline-block")
        $('body').css("background", "");
      });
      $('#yes').on('click', function() {
        $('#title').html("Sucess! A Request to Rent Has Been Sent To Owner!").css("color", "red");
        $('#yes').css("display", "none");
        $('#no').css("display", "none");
        $('#back').css("display", "inline-block");
      });
      $('#back').on('click', function() {
        $('#confirmRentModal').css("display", "none");
        $('#mainCard').css("display", "flex");
        $('#newCard').css("display", "inline-block");
        $('#yes').css('display', "inline-block");
        $("#no").css("display", "inline-block");
        $('#title').html("Are You Sure You Want to Rent this Item?").css("color", "black");
        $('#back').css("display", "none");
        $('body').css("background", "");
      });
  });
}
function newCardGenerate() {
}

