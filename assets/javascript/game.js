// Choosing a random word
var words = ["mushroom", "flower", "castle", "princess"];
var word = words[Math.floor(Math.random() * words.length)];

// Creating the answer array
var wordGuess = "";
var answerArray = [];
for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
    wordGuess += "_ ";
}

// Creating the array for checking the letters whether have been used
var alphabets = [];
for (i = 0; i < 26; i++) {
    alphabets[i] = true;
}

var remainingLetters = word.length;
var remainingChances = 10;
var userAnswers = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
var guessRight = false;

var displayAnswer = document.getElementById("answers");
var displayGuessed = document.getElementById("guesses")
var userHP = document.getElementById("user");
var comHP = document.getElementById("computer");
var endingGame = document.getElementById("message")    // .innerHTML

// Display game status
displayAnswer.textContent = wordGuess;
displayGuessed.textContent = userAnswers;
userHP.textContent = remainingChances;
comHP.textContent = remainingLetters;

// 'On key up' function
document.onkeyup = function (e) {
    // Check the game status
    if (remainingLetters ===0 || remainingChances === 0) {
        return;
    }

    var userInput = e.key;
    userInput = userInput.toLowerCase();
    var codeInput = userInput.charCodeAt(0);

    // Valid only 'a~z' letters only
    if (userInput.length === 1 && codeInput >= 97 && codeInput <= 122) {
        // Check the input key whether have been used or not
        if (alphabets[codeInput - 97]) {
            alphabets[codeInput - 97] = false;

            userAnswers = "";
            for (i = 0; i < 26; i++) {
                if (!alphabets[i]) {
                    userAnswers += "* ";
                } else {
                    userAnswers += String.fromCharCode(i+65) + " ";
                }
            }

            // Check with user input and the answer
            guessRight = false;
            for (i = 0; i < word.length; i++) {
                if (word[i] === userInput) {
                    guessRight = true;
                    answerArray[i] = userInput;
                    remainingLetters--;
                }
            }

            if (!guessRight) {
                remainingChances--;
            }

            wordGuess = "";
            for (var i = 0; i < answerArray.length; i++) {
                wordGuess += answerArray[i] + " ";
            }

            // Display game status
            displayAnswer.textContent = wordGuess;
            displayGuessed.textContent = userAnswers;
            userHP.textContent = remainingChances;
            comHP.textContent = remainingLetters;

            // Show ending
            if (remainingLetters === 0) {
                endingGame.textContent = "You won";
            } else if (remainingChances === 0) {
                endingGame.textContent = "You lost";
            }
        }
    }
}