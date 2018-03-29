$(document).on('ready', function () {
  $('#ownerSubmit').on('click', function (e) {
    e.preventDefault();
    // alert('button clicked!')
    function trimIfString(val) {
      return typeof val === 'string' ? val.trim() : val;
    }
    var newItem = {
      username: trimIfString($('#userName').val()),
      item: trimIfString($('#item-name').val()),
      rate: trimIfString($('#item-price').val()),
      owner: trimIfString('placeholder'),
      location: trimIfString($('#item-location').val()),
      category: trimIfString($('#item-category').val()),
     // imgURL: trimIfString($('item-img').val()),
      description: trimIfString($('#item-description').val())
    };
    console.log(newItem);
    $.ajax('/api/rentals', {
      type: 'POST',
      data: newItem
    }).then(function () {
      console.log("*** NEW RENTAL ADDED ***");
      var newOwnerCard = $("<div>");
            newOwnerCard.addClass("card");
            newOwnerCard.attr("id", "newOwnerCard");
      // var newImg = $("<img>");
      //   newImg.addClass("card-img-top");
      //   newImg.attr("src", imgURL);
      var cardTitle = $("<h4>");
        cardTitle.addClass("card-title");
          cardTitle.append(newItem.item);
      var newUL = $("<ul>");
        newUL.addClass("list-group list-group-flush");
      var description = $("<li>");
        description.addClass("list-group-item");
        description.attr("id", "describe");
          description.html(newItem.description);
      var cat = $("<li>");
        cat.addClass("list-group-item");
          cat.html(newItem.category);
      var ra = $("<li>");
        ra.addClass("list-group-item");
          ra.html(newItem.rate);
      var loc = $("<li>");
        loc.addClass("list-group-item");
          loc.html(newItem.location);
      newUL.append(description, cat, ra, loc);
      newOwnerCard.append(cardTitle, newUL);
      $('#ownerResults').append(newOwnerCard);
    });
  });
});
$('.modal').modal('show');
$("#submit-modal").on('click', function() {
  var userName = $('#userNameOne').val().trim();
  console.log(userName);
  $.ajax({
    url : "/api/rental/",
    method: "GET"
  }).then(function(data) {
    console.log(data.length);
    for (i = 0; i < data.length; i++) {
      var name = data[i].username;
      var item = data[i].item;
      var category = data[i].category;
      var describe = data[i].description;
      var location = data[i].location;
      var rate = data[i].rate;
      var imgURL = data[i].imgURL;
      var owner = data[i].owner;

      if (userName === name) {
        $('.modal').modal('hide');
        var newOwnerCard = $("<div>");
          newOwnerCard.addClass("card");
          newOwnerCard.attr("id", "newOwnerCard");
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
          newUL.append(describe, cat, ra, loc);
          newOwnerCard.append(newImg, cardTitle, newUL);
          $('#ownerResults').append(newOwnerCard);
      }else {
        $('.modalInfo').html("Invalid username");
        $('#newUser').css("display", "block");
        //$('#newUserInput').css("display","block");
      }
    }
  });
});
$("#newUser").on('click', function() {
  $('#newUserInput').css("display", "block");
  $('#submit-modal').css("display", "none");
  $("#close").html("Create New User");
  $('#newUser').css("display", "none");
});