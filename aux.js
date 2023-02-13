let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).click(() => {
        $("." + currentColour).addClass("pressed");
    
        setTimeout(() => {
            $("." + currentColour).removeClass("pressed");
        }, 100);
    })
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);

    $("#level-title").text("Level " + level);
    ++level;
    userClickedPattern = [];
}

$(".btn").click(function () {
    if (level) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        nextSequence();
    }
  });

  $("body").keypress( function(){
    console.log("pressed");
    if (!level) {
      nextSequence();
    }
  });