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
var timer;
var currentTime;
var currentScore;
var scoresFromStorage;
var isGoingToScoreboard;

var highScore = [
  {
    tries: null,
    date: null,
    time: null,
    number: null,
  },
  {
    tries: null,
    date: null,
    time: null,
    number: null,
  },
  {
    tries: null,
    date: null,
    time: null,
    number: null,
  },
  {
    tries: null,
    date: null,
    time: null,
    number: null,
  },
  {
    tries: null,
    date: null,
    time: null,
    number: null,
  },
];

setInitialLocalStorage();
//take object values from localStorage and put it in the variable
scoresFromStorage = JSON.parse(localStorage.getItem("scores"));

//set the initial blank scoreboard with empty cells
setScoresTable();

startGame();

$(".popup-button-continue").click(function (e) {
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

// ------------------------- functions -------------------------

function setInitialLocalStorage() {
  //if the localStorage is empty, fill it with blank scoreboard
  if (localStorage.getItem("scores") == null) {
    localStorage.setItem("scores", JSON.stringify(highScore));
  }
}

function setHighScores() {
  scoresFromStorage = JSON.parse(localStorage.getItem("scores"));
  for (var i = 0; i < scoresFromStorage.length; i++) {
    if (scoresFromStorage[i].tries == currentScore.tries) {
      if (scoresFromStorage[i].time > currentScore.time || scoresFromStorage[i].time == currentScore.time) {
        putOnScoreboard(i);
        break;
      }
    }
    if (scoresFromStorage[i].tries == null) {
      putOnScoreboard(i);
      break;
    } else if (scoresFromStorage[i].tries > currentScore.tries) {
      putOnScoreboard(i);
      break;
    }
  }

  localStorage.setItem("scores", JSON.stringify(scoresFromStorage));
}

function putOnScoreboard(index) {
  isGoingToScoreboard.isGoing = true;
  isGoingToScoreboard.place = index + 1;
  scoresFromStorage.splice(index, 0, currentScore);
  scoresFromStorage.pop();
}

function setScoresTable() {
  scoresFromStorage.forEach((item, index) => {
    $(".table-guess-count").eq(index).text(item.tries);
    $(".table-date").eq(index).text(item.date);
    $(".table-time").eq(index).text(convertToDurationString(item.time));
    $(".table-number").eq(index).text(item.number);
  });
}

function startGame() {
  startTimer();

  generatedNumber = Math.floor(Math.random() * guessRange) + 1;
  generatedNumber = 3;
  currentGuessesArray = [];
  toLowArray = [];
  toHighArray = [];
  numberOfGuesses = 0;
  userTriesString = "";
  userToLowTriesString = "";
  userToHighTriesString = "";
  currentTime = 0;
  isGoingToScoreboard = {
    isGoing: false,
    place: 0,
  };
  console.log("answer is - " + generatedNumber);

  $(".tries-too-high").text("");
  $(".tries-recent").text("");
  $(".tries-all").text("");
  $(".tries-too-low").text("");

  $(".tries").toggle();

  $(".guess-input").val(3);
  $(".guess-input").focus();
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
  currentScore = {
    tries: numberOfGuesses,
    date: getDateString(),
    time: currentTime,
    number: generatedNumber,
  };

  setHighScores();
  setScoresTable();

  if (isGoingToScoreboard.isGoing) setupPopupPlaceIndicator(true, isGoingToScoreboard.place);
  else setupPopupPlaceIndicator(false, isGoingToScoreboard.place);

  $(".popup-container").toggleClass("popup-container-show");
  $(".popup-background").toggleClass("popup-background-show");

  $(".popup-number").text(generatedNumber);
  $(".popup-tries").text(numberOfGuesses);

  $(".hint-text").removeClass("hint-show");
  $(".button-submit").attr("disabled", "");

  clearInterval(timer);
  $(".popup-time").text(convertToDurationString(currentTime));
}

function setupPopupPlaceIndicator(condition, place) {
  const suffix = ["st", "nd", "rd", "th", "th"];
  var p = $(".popup-score");
  var button = $(".popup-button-continue");

  if (condition) {
    console.log("true");
    p.html("This attempt goes <span class='popup-place'>5th</span> in the High Score board!");
    button.text("great");
    $(".popup-place").text(place + suffix[place - 1]);
  } else {
    console.log("false");
    p.text("But you did not hit high score :(");
    button.text("oh well");
  }
}

function startTimer() {
  timer = setInterval(() => {
    currentTime += 0.01;
  }, 10);
}

function convertToDurationString(seconds) {
  //this is for when function is filling blank scoreboard
  if (seconds == null) return null;

  var min = Math.floor(seconds / 60);
  //takes the decimal seconds var and rounds it to exactly 2 decimal places
  var sec = (Math.round(seconds * 100) / 100).toFixed(2);

  if (seconds >= 60) {
    sec = Math.round(sec % 60);
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec + " min";
  } else {
    return sec + " sec";
  }
}

function getDateString() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDay();
  return month + " " + day;
}
