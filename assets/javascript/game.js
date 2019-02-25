"use scrict"

var guessGame = {
    
     status : {
        isCorrect : false
        ,isComplete : false
        ,WordBoard : []
        ,secretWord : ""
    }
    ,listOfWords : [
        'Awkward', 'Bagpipes', 'Banjo', 'Bungler', 'Croquet', 'Crypt', 'Dwarves', 'Fervid', 'Fishhook', 'Fjord', 'Gazebo', 'Gypsy', 'Haiku', 'Haphazard', 'Hyphen',
        'Ivory', 'Jazzy', 'Jiffy' , 'Jinx', 'Jukebox', 'Kayak', 'Kiosk', 'Klutz', 'Memento', 'Mystify', 'Numbskull', 'Ostracize', 'Oxygen', 'Pajama', 'Phlegm', 'Pixel',
        'Polka', 'Quad', 'Quip', 'Rhythmic', 'Rogue', 'Sphinx', 'Squawk', 'Swivel', 'Toady', 'Twelfth', 'Unzip', 'Waxy', 'Wildebeest', 'Yacht', 'Zealous', 'Zigzag', 'Zippy', 'Zombie'
    ]
    ,setupTheWordBoard : function() {
        this.status.WordBoard = [];
        for (var i = 0; i < this.status.secretWord.length; i++) {
            this.status.WordBoard.push("_");
        }
    }
    ,updateTheWordBoard : function(letter) {
        var isMatched = false;
        console.log("update: ", typeof letter, letter);
        for (var i = 0; i < this.status.secretWord.length; i++) {
            if (this.status.secretWord[i] === letter) {
                 isMatched = true;
                this.status.WordBoard[i] = letter;
            }
        }
        console.log("isMatched: ", isMatched);
        console.log(this.status.WordBoard);
    }
    ,checkIfTheLetterHasAMatch(letter) {
        var checkHasAMatch = this.status.secretWord.indexOf(letter);
        this.status.isCorrect = (checkHasAMatch>-1) ? true : false;
    }
    ,checkIfWordIsComplete : function() {
        var checkIfGuessed = this.status.WordBoard.indexOf("_");
        this.status.isComplete = (checkIfGuessed < 0) ? true : false;
    }
    //picks a random word from the 'listOfWords' then assigns it to the 'secretWord'
    ,selectAWordFromTheList : function() {
        var randomNumber = Math.floor(Math.random() * this.listOfWords.length);
        var randomlySelectedWord = this.listOfWords[randomNumber];
        randomlySelectedWord = randomlySelectedWord.toUpperCase();
        this.status.secretWord = randomlySelectedWord;
    }
    ,pickANewWord : function() {
        //get a new word and prepare the WordBoard
        this.selectAWordFromTheList();
        this.setupTheWordBoard();
        return this.status;
    }
    ,makeAGuess : function(letter) {
        this.checkIfTheLetterHasAMatch(letter);
        if(this.status.isCorrect) {    //the letter has a match
            this.updateTheWordBoard(letter);
        }
        this.checkIfWordIsComplete();
        this.status.isComplete
        return this.status;
    }
    ,whatIsTheSecretWord() {
        console.log(this.status.secretWord);
    }
};

var gameConsole = {
    score : {
        wins : 0
        ,losses : 0 
        ,guessesRemaining : 10
        ,isPlayingAGame : false
    }
    ,previousLetterGuesses : []
    ,sounds : {
        correct: new Audio('./assets/sounds/prism-2.mp3')
        ,error: new Audio('./assets/sounds/07055186.wav')
        ,wrong: new Audio('./assets/sounds/glass_breaking_2.wav')
        ,winner: new Audio('./assets/sounds/crowdapplause.mp3')
        ,loser: new Audio('./assets/sounds/losing-horn.mp3')
    
    }
    ,playSound : function(soundToBePlayed) {
        //stop the current audio if it is still playing
        if(!this.sounds[soundToBePlayed].paused) {
            this.sounds[soundToBePlayed].pause();
            this.sounds[soundToBePlayed].currentTime = 0;
        }
        //now play the sound
        this.sounds[soundToBePlayed].play();
    }
    ,areWeStillPlaying : function() {
        return this.score.isPlayingAGame;
    }
    ,checkIsItALetter : function(letter) {
        var regex = /[A-Z]/;
        var found = letter.match(regex);
        if(found){
            return true;
        } else {
            return false;
        }
    }
    ,checkIsItANEWLetter : function(letter) {
        if(this.previousLetterGuesses.indexOf(letter) === -1) {   //not found in the list, so it is new
            this.previousLetterGuesses.push(letter);
            var pickedletter = $("<span>").text(letter).addClass("picked_letters").text(letter);
            $(".div_guesses").prepend(pickedletter);
            // $(".div_guesses").prepend("<span>").addClass("picked_letters").text(letter);
            return true;
         } else {
             return false;
        }
    }
    ,clearLetterGuesses : function() {
        this.previousLetterGuesses = [];
        $(".div_guesses").empty();
    }
    ,checkIfGameOver : function() {
        var isUsedUp = (this.score.guessesRemaining===0) ? true : false;
        return isUsedUp;
    }
    ,decrementGuessCounter : function() {
        this.score.guessesRemaining--;
        this.score.isPlayingAGame = (this.score.guessesRemaining<=0) ? false : true;
        this.playSound("wrong");
        this.refreshScoreBoard();
    }
    ,incrementWINS : function() {
        this.score.wins++;
        this.refreshScoreBoard();
    }
    ,incrementLOSSES(){
        this.score.losses++;
        this.refreshScoreBoard();
    }
    ,hideLetterBoard : function() {
        $(".letters").addClass("d-none");
    }
    ,showLetterBoard : function() {
        $(".letters").removeClass("d-none");
    }
    ,refreshScoreBoard : function() {
        $("#wins").text(this.score.wins);
        $("#losses").text(this.score.losses);
        $("#guesses").text(this.score.guessesRemaining);  
        console.log("updateScoreBoard:");
    }
    ,refreshWordBoard : function(status) {
        $("#h1-word-board").text(status.WordBoard.join(""));
    }
    ,resetGuessCounter : function() {
        this.score.guessesRemaining = 10;    
        $("#guesses").text(this.score.guessesRemaining);  
    }
    ,prepareTheConsole : function() {
        this.score.wins = 0;
        this.score.losses = 0;
        this.hideLetterBoard();
        this.promptPressAnykeyToStart();
        console.log("ready to start a game");
    }
    ,startAGame : function(status) {
        this.score.isPlayingAGame = true;
        this.hidePressAnykeyToStart();
        this.resetGuessCounter();
        this.refreshScoreBoard();
        this.refreshWordBoard(status);
        this.showLetterBoard();
        $("#h1-word-board").removeClass("winner loser");

    }
    ,promptPressAnykeyToStart : function() {
        $("#h1-start").removeClass();
    }
    ,hidePressAnykeyToStart : function() {
        $("#h1-start").addClass("d-none");
    }
    ,youWON : function(status) {
        this.incrementWINS();
        this.score.isPlayingAGame = false;
        $("#h1-word-board").addClass("winner");
        $("#h1-word-board").text(status.secretWord);
        this.hideLetterBoard();
        this.clearLetterGuesses();
        this.promptPressAnykeyToStart();
        console.log("YOU WON...CONGRATULATIONS");
        this.playSound("winner");
    }
    ,youLOST : function(status) {
        this.incrementLOSSES();
        $("#h1-word-board").addClass("loser");
        $("#h1-word-board").text(status.secretWord);
        this.hideLetterBoard();
        this.clearLetterGuesses();
        this.promptPressAnykeyToStart();
        console.log("SORRY...YOU LOST");
        this.playSound("loser");
    }
};


$("document").ready( function() {
    'use strict'
    // KEYPRESS LISTENER
    $(document).on("keypress", function(event) {     
        //Find out which letter was pressed
        var keypressed = String.fromCharCode(event.which);
        keypressed = keypressed.toUpperCase();    
        console.log("keypress: ", keypressed);
        main(keypressed);
    });
    //WAIT FOR CLICK ON THE 'PRESS ANY KEY TO START'
    $("#h1-start").on("click", function(){
        main("S");
    });
    //LISTEN FOR CLICKS
    $(".letters").on("click", function() {
        //Find out which letter was clicked
        var letterThatWasClicked = $(this).attr("letter-name");
        console.log("clicked: " + letterThatWasClicked); 
        main(letterThatWasClicked);
    });

   //reset the score board when the page loads
   gameConsole.prepareTheConsole();
});


function main(letterThatWasClicked) {
    //return a TRUE = gameOVer
    'use strict'
    console.log("we have began");
    //START A NEW GAME
    if(!gameConsole.score.isPlayingAGame) {
        //new game: get a new word
        var status = guessGame.pickANewWord();
        gameConsole.startAGame(status);
        guessGame.whatIsTheSecretWord();
        return;
    }

    //check if the key is a letter
    var isLetter = gameConsole.checkIsItALetter(letterThatWasClicked);
    if(isLetter){
        //hide the letter that was clicked from the screen
        $(".letter" + letterThatWasClicked).addClass("d-none");
    } else {
        gameConsole.playSound("error");
        return false;
    }

    var isNew = gameConsole.checkIsItANEWLetter(letterThatWasClicked);
    console.log("isNew: ", isNew);
    if(!isNew) {        //letter was previously pressed
         gameConsole.playSound("error");
         return false;
    }
        
    var status = guessGame.makeAGuess(letterThatWasClicked);
    console.log("make a guess: ", status);

    if(status.isCorrect){
        if(status.isComplete){
            gameConsole.youWON(status);
            return;
        }
        //refresh the WordBoard
        gameConsole.refreshWordBoard(status);
        gameConsole.playSound("correct"); 
    } else {
        gameConsole.decrementGuessCounter();
        if(!gameConsole.areWeStillPlaying()) {
            gameConsole.youLOST(status);
            return;
        }
    }
}


















