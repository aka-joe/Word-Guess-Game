// Mario words list
var words = ["mushroom", "flower", "castle", "princess", "turtle", "star", "jump", "coin", "yoshi", "mario", "peach", "luigi", "plumber", "pipe", "cannon", "hammer", "bomb", "brick", "super"];

// creating variables
var word = "";
var wordGuess = "";
var answerArray = [];
var alphabets = [];
var remainingLetters = 0;
var remainingChances = 0;
var userAnswers = "";
var gameStatus = "";
var guessRight = false;
var displayAnswer = document.getElementById("answers");
var displayMessage = document.getElementById("message2");
var userHP = document.getElementById("user");
var comHP = document.getElementById("computer");
var themeSong = document.getElementById("theme");
var easySong = document.getElementById("easyMode");
var hardSong = document.getElementById("hardMode");
var rightSound = document.getElementById("answerRight");
var wrongSound = document.getElementById("answerWrong");
var winSound = document.getElementById("win");
var loseSound = document.getElementById("lose");

// Initialize the game
function reset() {
    // Choosing a random word
    word = words[Math.floor(Math.random() * words.length)];

    // Reset values
    answerArray = [];
    alphabets = [];
    wordGuess = "";
    userAnswers = "";
    remainingLetters = word.length;
    remainingChances = 0;
    guessRight = false;
    gameStatus = "ready";

    // Creating the answer array
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "?";
        wordGuess += "<div class='brick'>?</div>";
    }
    for (i = 0; i < 26; i++) {
        alphabets[i] = true;
    }

    // reset the screen
    userHP.innerHTML = "";
    comHP.innerHTML = "";
    displayAnswer.innerHTML = "";
    displayMessage.innerHTML = "";
    screenImg("url('./assets/images/start.jpg')");

    //reset the sound
    winSound.pause();
    loseSound.pause();
    easySong.currentTime = 0;
    hardSong.currentTime = 0;
    winSound.currentTime = 0;
    loseSound.currentTime = 0;
    themeSong.currentTime = 0;
    themeSong.play();
}
reset();

// Change background image
function screenImg(imgURL) {
    document.getElementById("gb-screen").style.backgroundImage = imgURL;
}

// Display game status
function displayStatus() {
    userHP.innerHTML = "MARIO's<br>Life x" + remainingChances;
    comHP.innerHTML = "Bricks<br>Left x" + remainingLetters;
    displayAnswer.innerHTML = wordGuess;
    if (gameStatus === "start") {
        if (userAnswers != "") {
            displayMessage.innerHTML = "<br>LETTERS GUESSED:<br>" + userAnswers;
        }
    } else {
        displayMessage.innerHTML = userAnswers;
    }
}

// Start the game
function startGame(chances) {
    remainingChances = chances;
    gameStatus = "start";
    screenImg("url('./assets/images/main.jpg')");
    displayMessage.innerHTML = "<br>Press A - Z keys<br>to guess the word"
    displayStatus();
    rightSound.play();
}

// End the game
function endGame(status) {
    gameStatus = "end";
    easySong.pause();
    hardSong.pause();
    if (status) {
        winSound.play();
        displayMessage.innerHTML = "<h1>Stage Clear!</h1>You win! Press 'Enter'<br>key to play again!";
    } else {
        loseSound.play();
        displayMessage.innerHTML = "<h1>Game Over!</h1>You lose... Press 'Enter'<br>key to try again!";
    }
}

// 'On key up' function
document.onkeyup = function (e) {

    var userInput = e.key;
    userInput = userInput.toLowerCase();
    var codeInput = userInput.charCodeAt(0);

    // Check the game status
    if (gameStatus === "ready") {
        if (userInput === "1") {
            themeSong.pause();
            easySong.play();
            startGame(10); // Easy mode
        } else if (userInput === "2") {
            themeSong.pause();
            hardSong.play();
            startGame(7);  // Hard mode
        } else {
            themeSong.play();
        }
    } else if (gameStatus === "end" && userInput === "enter") {
        reset(); // Restart the game
    }

    // If the game is not being played, exit the function
    if (remainingLetters === 0 || remainingChances === 0) {
        return;
    }

    // Valid only 'a~z' keys only
    if (userInput.length === 1 && codeInput >= 97 && codeInput <= 122) {
        // Check the input key whether have been used or not
        if (alphabets[codeInput - 97]) {
            alphabets[codeInput - 97] = false;

            // Check with user input and the answer
            guessRight = false;
            for (i = 0; i < word.length; i++) {
                if (word[i] === userInput) {
                    guessRight = true;
                    answerArray[i] = userInput;
                    remainingLetters--;
                }
            }

            // If the input key is not in the answer word...
            if (guessRight) {
                rightSound.play();
            } else {
                wrongSound.play();
                userAnswers += userInput + " ";
                remainingChances--;
            }

            // Show game status
            wordGuess = "";
            for (var i = 0; i < answerArray.length; i++) {
                wordGuess += "<div class='brick'>" + answerArray[i] + "</div>";
            }
            displayStatus();

            // Ending
            if (remainingLetters === 0) {
                endGame(true);
            } else if (remainingChances === 0) {
                endGame(false);
            }
        }
    }
}