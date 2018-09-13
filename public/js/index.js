// Get references to page elements
var $characterUsername = $("#character-username");
var $characterStock = $("#character-stock");
var $characterPassword = $("#character-password");
var $submitBtn = $("#submit");
var $refreshBtn = $("refresh");
var $characterList = $("#character-list");
var quote;
var character;
var youId;

// The API object contains methods for each kind of request we'll make
var API = {
  saveCharacter: function (character) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/characters",
      data: JSON.stringify(character)
    });
  },
  getCharacters: function () {
    return $.ajax({
      url: "api/characters",
      type: "GET"
    });
  },
  deleteCharacter: function (id) {
    return $.ajax({
      url: "api/characters/" + id,
      type: "DELETE"
    });
  }
};

// function that gets the real time stock price. cant get it to render to the page because of asynchronous stuff
function getQuote(ticker) {

  var queryURL = "https://api.iextrading.com/1.0/stock/" + ticker + "/quote";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(ticker + " price is: " + response.changePercent);
    return response.changePercent;
  });
}
// refreshExamples gets new examples from the db and repopulates the list
var refreshCharacters = function () {
  API.getCharacters().then(function (data) {
    // console.log(data);

    var $character = data.map(function (character) {
      //console.log(character);
      var $a = $("<a>")
        .text(character.username + " " + character.stockChoice + " " + "$" + (character.totalValue * (1 + parseFloat(character.stockPrice))).toFixed(2))
        .attr({
          href: "#collapseExample" + character.id,
          "data-target": "#collapse" + character.id,
          class: "fight btn btn-link collapsed",
          type: "button",
          "data-id": character.id,
          "data-toggle": "collapse"
        });

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": character.id
        })
        .append($a);


      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      youId = localStorage.getItem("youId");

      var $fight = $("<br><a>")
        .text("Fight this guy")
        .attr({
          href: "/fight/" + character.id + "/" + youId,
          id: "collapse" + character.id,
          class: "collapse btn btn-primary float-right",
          "data-parent": "#accordionExample"
        });

      $li.append($fight);

      return $li;

    });

    $characterList.empty();
    $characterList.append($character);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();
  character = {
    username: $characterUsername.val().trim(),
    stockChoice: $characterStock.val().trim(),
    password: $characterPassword.val().trim(),

  };
  getQuote1($characterStock.val().trim());


  if (!(character.username && character.stockChoice)) {
    alert("You must enter an example text and description!");
    return;
  }

  $characterUsername.val("");
  $characterStock.val("");
  $characterPassword.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");


  API.deleteCharacter(idToDelete).then(function () {
    refreshCharacters();
  });

};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$characterList.on("click", ".delete", handleDeleteBtnClick);
// $refreshBtn.on("click",);
refreshCharacters();

function getQuote1(ticker) {
  console.log("get quote 1 is working");
  console.log(ticker);
  var queryURL = "https://api.iextrading.com/1.0/stock/" + ticker + "/quote";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(ticker + " price is: " + response);
    console.log("character is line below");
    console.log(character);
    console.log("character is line above");
    character.stockPrice = response.changePercent;
    console.log(character);
    console.log(response);
    API.saveCharacter(character).then(function () {
      refreshCharacters();
    });
  });
}

$(document).ready(function () {
  var opponentId;

  $(this).on("click", ".fight", function () {
    opponentId = $(this).attr("data-id");
    window.localStorage.setItem("opponentId", opponentId);
    console.log(opponentId);
  });
});