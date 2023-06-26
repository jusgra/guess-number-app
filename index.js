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

// $(".popup-container").toggleClass("popup-container-show");
// $(".popup-background").toggleClass("popup-background-show");

// $(".tries-text").toggle();

startGame();

$(".popup-button").click(function (e) {
  e.preventDefault();

  $(".popup-container").toggleClass("popup-container-show");
  $(".popup-background").toggleClass("popup-background-show");
  $(".button-submit").removeAttr("disabled", "");
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

  $(".hint-text").addClass("hint-show");

  if (userGuess == generatedNumber) endGame();
  else if (userGuess > generatedNumber) {
    $(".hint-text").html("too&nbsp;<span class='to-high'>high</span>");
    toHighArray.push(userGuess);
    if (toHighArray.length == 1) {
      userToHighTriesString += userGuess;
    } else if (numberOfGuesses > 1) {
      userToHighTriesString += ", " + userGuess;
    }
  } else if (userGuess < generatedNumber) {
    $(".hint-text").html("too&nbsp;<span class='to-low'>low</span>");
    toLowArray.push(userGuess);
    if (toLowArray.length == 1) {
      userToLowTriesString += userGuess;
    } else if (numberOfGuesses > 1) {
      userToLowTriesString += ", " + userGuess;
    }
  }

  updateGuessesList();

  // $(".guess-input").val("");
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

  $(".tries-one").text("");
  $(".tries-two").text("");
  $(".tries-three").text("");

  $(".tries-range").toggle();

  $(".tries-array").text(userTriesString);

  $(".guess").val("");
  $(".guess").focus();

  $(".tries-too-high").text("");
  $(".tries-too-low").text("");
}

function updateGuessesList() {
  var tryOne = $(".tries-one");
  var tryTwo = $(".tries-two");
  var tryThree = $(".tries-three");
  var tryHigh = $(".tries-too-high");
  var tryLow = $(".tries-too-low");

  if (numberOfGuesses == 1) {
    $(".tries-text").toggle();
    $(".tries-range").toggle();
  }

  tryLow.text(userToLowTriesString);
  tryHigh.text(userToHighTriesString);

  tryOne.text(currentGuessesArray[numberOfGuesses - 1]);
  tryTwo.text(currentGuessesArray[numberOfGuesses - 2]);
  tryThree.text(currentGuessesArray[numberOfGuesses - 3]);

  if (numberOfGuesses == 1) {
    userTriesString += userGuess;
  } else if (numberOfGuesses > 1) {
    userTriesString += ", " + userGuess;
  }

  // if (numberOfGuesses == 1) {
  //   userToLowTriesString += userGuess;
  // } else if (numberOfGuesses > 1) {
  //   userTriesString += ", " + userGuess;
  // }

  $(".tries-array").text(userTriesString);

  // array1.sort(function (a, b) {
  //   return a - b;
  // });
}

function endGame() {
  $(".popup-container").toggleClass("popup-container-show");
  $(".popup-background").toggleClass("popup-background-show");

  $(".popup-number").text(generatedNumber);
  $(".popup-tries").text(numberOfGuesses);

  $(".hint-text").removeClass("hint-show");
  $(".button-submit").attr("disabled", "");

  // $(".guess-container").toggle();
  $(".guess-form").toggle();
}
