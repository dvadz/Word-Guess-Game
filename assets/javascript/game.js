"use scrict"

var randonNumber, secretWord, secretWordDisplay;

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

//display "secret word"
secretWordDisplay = "";
for (var i = 0; i < secretWord.length; i++) {
    secretWordDisplay += "_"
}
$("#h1_the_secret_word").text(secretWordDisplay);

$("#div_alphabet").on("click", function (event) {

    //ignore the event if the div_alphabet was clicked
    if (event.target.id === "div_alphabet") {
        return;
    }

    //hide the letter that was clicked from the screen
    $("#" + event.target.id).addClass("disappear");

    //get the identity of the letter that was clicked
    var letterThatWasClicked = event.target.innerText;
    console.log(`var letterThatWasClicked: ${letterThatWasClicked}`);

    //remove that letter from the alphabet array
    for (var i = 0; i < alphabet.length; i++) {
        if (alphabet[i] === letterThatWasClicked) {
            alphabet.splice(i, 1);
            console.log(`matched: ${i}`);
        }
    }
    console.log(alphabet);


});