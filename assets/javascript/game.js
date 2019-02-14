"use scrict"

var randonNumber, 
    secretWord, 
    secretWordDisplay,
    gameOver = false, 
    attemptsLeft = 10;


var alphabet = ["A", 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var listOfWords = [
    'perspective',
    'exellecent',
    'prerogative',
    'microwave',
    'transplant',
    'witchcraft',
    'syndrome',
    'twelfth',
    'oxygen',
    'quartz'
];

//pick a random word from the array
randomNumber = Math.floor(Math.random() * 10);
secretWord = listOfWords[randomNumber];
secretWord = secretWord.toUpperCase();
console.log(secretWord);

//display "secret word"
secretWordDisplay = [];
for (var i = 0; i < secretWord.length; i++) {
    secretWordDisplay.push("_");
}
$("#h1_the_secret_word").text(secretWordDisplay.join(""));

// --------------------------------------------------------------------------------
// ------------ INITIALIZATION OF THE GAME SHOULD END HERE ------------------------

// KEYPRESS LISTENER
$(document).on("keypress", function (event) {

    //Find out the letter that was pressed
    var keypressed = String.fromCharCode(event.which);
    keypressed = keypressed.toUpperCase();    
    console.log(keypressed);
    
     if(alphabet.indexOf("_") === -1) {
        console.log("already pressed");
        return;
     }

    game(keypressed);

});


//LISTEN FOR CLICKS
$("#div_alphabet").on("click", function (event) {

    //Check if gameOver
    if(gameOver){
        console.log("ignored");
        return;
    }

    //ignore the event if the div_alphabet was clicked
    if (event.target.id === "div_alphabet") {
        return;
    }

    //get the identity of the letter that was clicked
    var letterThatWasClicked = event.target.innerText;

    game(letterThatWasClicked);
   
});


function game(letterThatWasClicked) {

    //hide the letter that was clicked from the screen
    // $("#" + event.target.id).addClass("disappear");
    $("#letter" + letterThatWasClicked).addClass("disappear");
    console.log(event.target.id);

    //remove that letter from the alphabet array
    for (var i = 0; i < alphabet.length; i++) {
        if (alphabet[i] === letterThatWasClicked) {
            alphabet.splice(i, 1);
        }
    }

    //Check if there is any match
    var isMatched = false;
    for (var i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letterThatWasClicked) {
            isMatched = true;
            secretWordDisplay[i] = letterThatWasClicked;
        }
    }
    $("#h1_the_secret_word").text(secretWordDisplay.join(""));

    //Check if the word has been guessed
    var checkIfGuessed = secretWordDisplay.indexOf("_");
    if(checkIfGuessed < 0) {
        gameOver = true;
        console.log("YOU WON...CONGRATULATIONS");
    }

    //Update the remaining attempts var
    if (isMatched) {
        //make a sound
    } else {
        attemptsLeft--;
        console.log(`Attempts: ${attemptsLeft}`);
        if (attemptsLeft == 0) {
            gameOver = true;
            console.log("YOU LOST...GAMEOVER");
        }
    }
}
