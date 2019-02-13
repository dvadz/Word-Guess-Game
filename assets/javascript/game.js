"use scrict"

var randonNumber, secretWord, secretWordDisplay;

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
    if (event.target.id === "div_alphabet") {
        return;
    }
    console.log(event.target.id);
    $("#" + event.target.id).addClass("selected");

});