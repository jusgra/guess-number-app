var guessRange = 100;
var generatedNumber;
var currentGuessesArray;
var toHighArray;
var toLowArray;
var numberOfGuesses;
var userTriesString;
var userToLowTriesString;
var userToHighTriesString;
var userGuess;

// $(".tries").toggle();
// $(".tries-text").toggle();

startGame();

$(".popup-button").click(function (e) {
  e.preventDefault();

  $(".popup-container").toggleClass("popup-container-show");
  $(".popup-background").toggleClass("popup-background-show");
  $(".button-submit").removeAttr("disabled", "");

  $(".guess-form").toggle();
});

$(".restart-button").click(function (e) {
  e.preventDefault();

  startGame();
  $(".guess-form").toggle();
  $(".tries-text").toggle();
});

$(".guess-form").submit(function (e) {
  e.preventDefault();
  numberOfGuesses += 1;

  userGuess = $(".guess-input").val();
  currentGuessesArray.push(userGuess);

  if (userGuess == generatedNumber) endGame();
  else if (userGuess > generatedNumber) {
    showHint(true);
    toHighArray.push(userGuess);
  } else if (userGuess < generatedNumber) {
    showHint(false);
    toLowArray.push(userGuess);
  }

  updateGuessesList();

  $(".guess-input").val("");
});

function startGame() {
  generatedNumber = Math.floor(Math.random() * guessRange) + 1;
  currentGuessesArray = [];
  toLowArray = [];
  toHighArray = [];
  numberOfGuesses = 0;
  userTriesString = "";
  userToLowTriesString = "";
  userToHighTriesString = "";
  console.log("answer is - " + generatedNumber);

  $(".tries-too-high").text("");
  $(".tries-recent").text("");
  $(".tries-all").text("");
  $(".tries-too-low").text("");

  $(".tries").toggle();

  $(".guess").val("");
  $(".guess").focus();
}

function showHint(isGuessHigher) {
  $(".hint-text").addClass("hint-show");
  if (isGuessHigher) $(".hint-text").html("too&nbsp;<span class='too-high'>high</span>");
  else $(".hint-text").html("too&nbsp;<span class='too-low'>low</span>");
}

function updateGuessesList() {
  var tryRecent = $(".tries-recent");
  var tryHigh = $(".tries-too-high");
  var tryLow = $(".tries-too-low");
  var tryText = $(".tries-text");
  var tries = $(".tries");
  var tryAll = $(".tries-all");

  if (numberOfGuesses == 1) {
    tryText.toggle();
    tries.toggle();
  }

  userTriesString = currentGuessesArray.join(", ");

  //sorts array in decending order and puts all elements in a string
  toLowArray.sort((a, b) => {
    return b - a;
  });
  userToLowTriesString = toLowArray.join(", ");

  //sorts array in decending order and puts all elements in a string
  toHighArray.sort((a, b) => {
    return b - a;
  });
  userToHighTriesString = toHighArray.join(", ");

  tryLow.text(userToLowTriesString);
  tryHigh.text(userToHighTriesString);
  tryRecent.text(currentGuessesArray[numberOfGuesses - 1]);
  tryAll.text(userTriesString);
}

function endGame() {
  $(".popup-container").toggleClass("popup-container-show");
  $(".popup-background").toggleClass("popup-background-show");

  $(".popup-number").text(generatedNumber);
  $(".popup-tries").text(numberOfGuesses);

  $(".hint-text").removeClass("hint-show");
  $(".button-submit").attr("disabled", "");
}
