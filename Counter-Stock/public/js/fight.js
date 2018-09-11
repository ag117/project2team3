$(document).ready(function () {

  var yourValue;
  var theirValue;
  var youId = 1;
  var opponentId;
  var characterChange;
  var opponentChange;

  function getPrices1() {
    $.ajax({
      method: "GET",
      url: "/fight/" + youId
    }).then(function(response) {
      characterChange = response.stockPrice;
      yourValue = response.totalValue;
    });
  }

  function getPrices2() {
    $.ajax({
      method: "GET",
      url: "/fight/" + opponentId
    }).then(function(response) {
      opponentChange = response.stockPrice;
      theirValue = response.totalValue;
    });
  }

  getPrices1();
  getPrices2();

  yourValue = yourValue * (1 + characterChange);
  theirValue = theirValue * (1 + opponentChange);
  console.log(yourValue);
  console.log(theirValue);

  function fight() {
    var characterRoll = Math.floor(Math.random() * yourValue);
    var opponentRoll = Math.floor(Math.random() * theirValue);

    if (characterRoll > opponentRoll) {
      console.log("You win!");
    } else if (characterRoll < opponentRoll) {
      console.log("You lost");
    } else {
      console.log("Something went wrong, please try again");
    }
  }

  $("#fight").on("click", fight);
});