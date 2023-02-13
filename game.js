var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    ++level;
    $("#level-title").text("Level " + level);
}

function startOver() {
    level = 0;
    gamePattern = [];
}

function checkAnswer() {

    lastColour = userClickedPattern.length - 1;

    if (userClickedPattern[lastColour] === gamePattern[lastColour]) {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        } 
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(".btn").click((event) => {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer();
})

$("body").keypress(() => {
    if(!level) {
        $("#level-title").text("Level 0");
        nextSequence();
    }
})

