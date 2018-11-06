// Words list
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
}
reset();

// Change background image
function screenImg(imgURL) {
    document.getElementById("gb-screen").style.backgroundImage = imgURL;
}

// Display game status
function displayStatus() {
    userHP.innerHTML = "MARIO<br>Life x" + remainingChances;
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

// Starting the game
function startGame(chances) {
    remainingChances = chances;
    gameStatus = "start";
    screenImg("url('./assets/images/main.jpg')");
    displayMessage.innerHTML = "<br>Press A - Z keys<br>to guess the word"
    displayStatus();
}

// 'On key up' function
document.onkeyup = function (e) {

    var userInput = e.key;
    userInput = userInput.toLowerCase();
    var codeInput = userInput.charCodeAt(0);
    
    // Check the game status
    if (gameStatus === "ready") {
        if (userInput === "1") {
            startGame(10); // Easy mode
        } else if (userInput === "2") {
            startGame(7);  // Hard mode
        }
    } else if (gameStatus === "end") {
        if (userInput === "enter") {
            reset(); // Restart the game
        }
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
            if (!guessRight) {
                userAnswers += userInput;
                remainingChances--;
            }

            // Show game status
            wordGuess = "";
            for (var i = 0; i < answerArray.length; i++) {
                wordGuess += "<div class='brick'>" + answerArray[i] + "</div>";
            }
            displayStatus();

            // Show an ending message
            if (remainingLetters === 0) {
                displayMessage.innerHTML = "<h1>Stage Clear!</h1>You win! Press 'Enter'<br>key to play again!"
                gameStatus = "end";
            } else if (remainingChances === 0) {
                displayMessage.innerHTML = "<h1>Game Over!</h1>You lose... Press 'Enter'<br>key to try again!"
                gameStatus = "end";
            }
        }
    }
}