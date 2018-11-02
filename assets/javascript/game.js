// Choosing a random word
var words = [
    "javascript",
    "monkey",
    "amazing",
    "pancake"
];
var word = words[Math.floor(Math.random() * words.length)];

// Creating the answer array
var answerArray = [];
for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
}
var remainingLetters = word.length;


// Game Loop
while (remainingLetters > 0) {

    // Showing the progress
    alert(answerArray.join(" "));

    // Handling the player's input
    var guess = prompt("Guess a letter, or click Cancel to stop playing.");
    if (guess === null) {
        break;
    } else if (guess.length !== 1) {
        alert("Please enter a single letter.");
    } else {

        // Update the game state with the guess
        for (var j = 0; j < word.length; j++) {
            if (word[j] === guess) {
                answerArray[j] = guess;
                remainingLetters--;
            }
        }
    }

}

// Ending the game
alert(answerArray.join(" "));
alert("Good job! The answer was " + word);