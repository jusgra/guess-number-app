var guessRange = 100;
var generatedNumber = Math.floor(Math.random() * guessRange) + 1;
var userGuess;
var currentGuessesArray = [];
var numberOfGuesses;
var hasGameEnded = false;

numberOfGuesses = 0;

var triesString = "";

console.log("answer is - " + generatedNumber);

$(".popup-button").click(function (e) {
  e.preventDefault();
  $(".popup-content").toggleClass("popup-animation-show");
  $(".popup-background").toggleClass("popup-background-show");

  $(".button-submit").removeAttr("disabled", "");
});

$(".button-restart").click(function (e) {
  e.preventDefault();
  $(".guess-container").toggle();
  generatedNumber = Math.floor(Math.random() * guessRange) + 1;
  console.log("answer is - " + generatedNumber);
  currentGuessesArray = [];
  numberOfGuesses = 0;

  $(".tries-text").toggle();

  $(".tries-one").text("");
  $(".tries-two").text("");
  $(".tries-three").text("");

  triesString = "";
  $(".tries-array").text(triesString);

  $(".guess").val("");
  $(".guess").focus();
});

$("form").submit(function (e) {
  e.preventDefault();
  // $(".button-submit").attr("disabled", "");

  // if (hasGameEnded) {
  //   generatedNumber = Math.floor(Math.random() * guessRange) + 1;
  // } else {
  // }

  numberOfGuesses += 1;
  userGuess = $(".guess").val();
  currentGuessesArray.push(userGuess);
  switch (numberOfGuesses) {
    case 1:
      $(".tries-text").toggle();
      $(".tries-one").addClass("tries-span3");
      $(".tries-numbers>p").addClass("tries-bottom");
      break;
    case 2:
      $(".tries-one").removeClass("tries-span3");
      $(".tries-one").addClass("tries-span2");
      $(".tries-two").addClass("tries-span2");
      break;
    case 3:
      $(".tries-one").removeClass("tries-span2");
      break;
  }

  $(".tries-one").text(currentGuessesArray[numberOfGuesses - 1]);
  $(".tries-two").text(currentGuessesArray[numberOfGuesses - 2]);
  $(".tries-three").text(currentGuessesArray[numberOfGuesses - 3]);

  $(".hint-text").addClass("closed");
  var stringas = $(".hint-text").html();

  if (numberOfGuesses == 1) {
    triesString += userGuess;
  } else if (numberOfGuesses > 1) {
    triesString += ", " + userGuess;
  }

  if (userGuess == generatedNumber) {
    endGame();
  } else if (userGuess > generatedNumber) {
    $(".hint-text").html("too&nbsp;<span class='toHigh'>high</span>");
  } else if (userGuess < generatedNumber) {
    $(".hint-text").html("too&nbsp;<span class='toLow'>low</span>");
  }

  $(".guess").val("");

  $(".tries-array").text(triesString);
});
$("form").click(function (e) {});

function endGame() {
  hasGameEnded = true;
  $(".popup-content").toggleClass("popup-animation-show");
  $(".popup-background").toggleClass("popup-background-show");

  $(".popup-number").text(generatedNumber);
  $(".popup-tries").text(numberOfGuesses);

  $(".hint-text").removeClass("closed");
  $(".button-submit").attr("disabled", "");

  $(".guess-container").toggle();
}
