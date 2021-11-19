var arr = ["red", "blue", "green", "yellow"];

var gamepattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function () {
  if (started == false) {
    $("#level-title").text("level " + level);
    started = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  $("#" + userChosenColor).addClass("pressed");
  sound(userChosenColor);
  setTimeout(function () {
    $("#" + userChosenColor).removeClass("pressed");
  }, 200);

  match(userClickedPattern.length - 1);
});

function match(currentLevel) {
  if (userClickedPattern[currentLevel] === gamepattern[currentLevel]) {
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }
  } else {
    sound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function sound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var num = Math.floor(Math.random() * 4);
  gamepattern.push(arr[num]);
  $("#" + arr[num])
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  sound(arr[num]);
}

function startOver() {
  level = 0;
  gamepattern = [];
  started = false;
}
