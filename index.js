var guessRange = 100;
var generatedNumber;
var currentGuessesArray;
var numberOfGuesses;
var userTriesString;

startGame();

$(".popup-button").click(function (e) {
  e.preventDefault();

  $(".popup-container").toggleClass("popup-animation-show");
  $(".popup-background").toggleClass("popup-background-show");
  $(".button-submit").removeAttr("disabled", "");
});

$(".guess-form").submit(function (e) {
  e.preventDefault();

  numberOfGuesses += 1;

  var userGuess = $(".guess-input").val();
  currentGuessesArray.push(userGuess);

  updateGuessesList();

  $(".hint-text").addClass("hint-open");

  if (numberOfGuesses == 1) {
    userTriesString += userGuess;
  } else if (numberOfGuesses > 1) {
    userTriesString += ", " + userGuess;
  }
  $(".tries-array").text(userTriesString);

  if (userGuess == generatedNumber) endGame();
  else if (userGuess > generatedNumber) $(".hint-text").html("too&nbsp;<span class='toHigh'>high</span>");
  else if (userGuess < generatedNumber) $(".hint-text").html("too&nbsp;<span class='toLow'>low</span>");

  $(".guess-input").val("");
});

$(".button-restart").click(function (e) {
  e.preventDefault();

  startGame();
  $(".guess-container").toggle();
  $(".tries-text").toggle();
});

function startGame() {
  generatedNumber = Math.floor(Math.random() * guessRange) + 1;
  currentGuessesArray = [];
  numberOfGuesses = 0;
  userTriesString = "";
  console.log("answer is - " + generatedNumber);

  $(".tries-one").text("");
  $(".tries-two").text("");
  $(".tries-three").text("");

  $(".tries-array").text(userTriesString);

  $(".guess").val("");
  $(".guess").focus();
}

function updateGuessesList() {
  var tryOne = $(".tries-one");
  var tryTwo = $(".tries-two");
  var tryThree = $(".tries-three");

  switch (numberOfGuesses) {
    case 1:
      $(".tries-text").toggle();
      tryOne.addClass("tries-span3");
      break;
    case 2:
      tryOne.removeClass("tries-span3");
      tryOne.addClass("tries-span2");
      tryTwo.addClass("tries-span2");
      break;
    case 3:
      tryOne.removeClass("tries-span2");
      break;
  }

  tryOne.text(currentGuessesArray[numberOfGuesses - 1]);
  tryTwo.text(currentGuessesArray[numberOfGuesses - 2]);
  tryThree.text(currentGuessesArray[numberOfGuesses - 3]);
}

function endGame() {
  $(".popup-container").toggleClass("popup-animation-show");
  $(".popup-background").toggleClass("popup-background-show");

  $(".popup-number").text(generatedNumber);
  $(".popup-tries").text(numberOfGuesses);

  $(".hint-text").removeClass("hint-open");
  $(".button-submit").attr("disabled", "");

  $(".guess-container").toggle();
}
