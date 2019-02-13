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

