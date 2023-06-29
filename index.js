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

var highScore2 = [
  {
    tries: 10,
    date: null,
    time: 100,
    number: null,
  },
  {
    tries: 20,
    date: null,
    time: 90,
    number: null,
  },
  {
    tries: 30,
    date: null,
    time: 80,
    number: null,
  },
  {
    tries: 40,
    date: null,
    time: 70,
    number: null,
  },
  {
    tries: 50,
    date: null,
    time: 60,
    number: null,
  },
];

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

function setInitialLocalStorage() {
  if (localStorage.getItem("scores") == null) {
    localStorage.setItem("scores", JSON.stringify(highScore));
  }
}

// endGame();

// var currentScore = {
//   tries: 15,
//   date: "June 9",
//   time: 50,
//   number: 85,
// };

setInitialLocalStorage();
scoresFromStorage = JSON.parse(localStorage.getItem("scores"));

// setHighScores();
setScoresTable();

function setHighScores() {
  // console.log("currentScore - " + JSON.stringify(currentScore));
  scoresFromStorage = JSON.parse(localStorage.getItem("scores"));
  for (var i = 0; i < scoresFromStorage.length; i++) {
    if (scoresFromStorage[i].tries == currentScore.tries) {
      // console.log("tries == tries");
      if (scoresFromStorage[i].time > currentScore.time || scoresFromStorage[i].time == currentScore.time) {
        // console.log("time > time || time == time");
        scoresFromStorage.splice(i, 0, currentScore);
        scoresFromStorage.pop();
        break;
      }
    }
    if (scoresFromStorage[i].tries == null) {
      // console.log("tries == null");
      scoresFromStorage.splice(i, 0, currentScore);
      scoresFromStorage.pop();
      break;
    } else if (scoresFromStorage[i].tries > currentScore.tries) {
      // console.log("tries > tries");
      scoresFromStorage.splice(i, 0, currentScore);
      scoresFromStorage.pop();
      break;
    }
  }

  localStorage.setItem("scores", JSON.stringify(scoresFromStorage));
}

function setScoresTable() {
  scoresFromStorage.forEach((item, index) => {
    $(".table-guess-count").eq(index).text(item.tries);
    $(".table-date").eq(index).text(item.date);
    $(".table-time").eq(index).text(convertToDurationString(item.time));
    $(".table-number").eq(index).text(item.number);
  });
}

// $(".tries").toggle();
// $(".tries-text").toggle();

startGame();

$(".popup-button-continue").click(function (e) {
  e.preventDefault();

  $(".popup-container").toggleClass("popup-container-show");
  // $(".popup-container").toggleClass("popup-container-hide");
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
  currentTime = 0;
  startTimer();
  //$(".popup-container").toggleClass("popup-container-hide");

  generatedNumber = Math.floor(Math.random() * guessRange) + 1;
  generatedNumber = 3;
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
  $(".popup-container").toggleClass("popup-container-show");
  // $(".popup-container").toggleClass("popup-container-hide");
  $(".popup-background").toggleClass("popup-background-show");

  $(".popup-number").text(generatedNumber);
  $(".popup-tries").text(numberOfGuesses);

  $(".hint-text").removeClass("hint-show");
  $(".button-submit").attr("disabled", "");

  clearInterval(timer);
  $(".popup-time").text(convertToDurationString(currentTime));

  currentScore = {
    tries: numberOfGuesses,
    date: getDateString(),
    time: currentTime,
    number: generatedNumber,
  };

  setHighScores();
  setScoresTable();
}

function startTimer() {
  timer = setInterval(() => {
    currentTime++;
    // console.log(currentTime);
  }, 1000);
}

function convertToDurationString(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;

  if (seconds == null) return null;

  if (seconds > 60) {
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
  const currentTime = new Date();
  const month = monthNames[currentTime.getMonth()];
  const day = currentTime.getDay();
  return month + " " + day;
}
