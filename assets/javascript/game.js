var planets = [
	"Mercury", "Venus", "Mars", "Earth", "Jupiter", "Saturn", "Uranus", "Neptunes"
	];

var keyOptions = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x" , "c", "v", "b", "n", "m", "-", " "];

var wins = 0,
	losses = 0,
	totalGuesses = 4,
	guessedLetters = [],
	n = 0,
	j = 0,
	play = false,
	gameEnded = false,
	guessesRemaining = totalGuesses;

// Function to replace character
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

// Reset planet  name, Guesses Remaining and Letters Gussed
function reset() {
	guessesRemaining = totalGuesses;
	(document.getElementById("guesses")).textContent = guessesRemaining;
	guessedLetters = [];
	(document.getElementById("guessedLetters")).textContent = guessedLetters;
	(document.getElementById("spaces")).style.letterSpacing = 10;
	(document.getElementById("spaces")).textContent = "_____";
	(document.getElementById("image")).src = "assets/images/initial.png";
	n = 0;
	j = 0;
}

// Start Game
function playGame() {
	document.getElementById("button").blur();
	reset();
	play = true;
	gameEnded = false;
	pickPlanet();
	(document.getElementById("guesses")).textContent = totalGuesses;
	// Update spaces for planet  name
	(document.getElementById("spaces")).textContent = spaces;
}

// Pick random planet 
function pickPlanet() {
	currentplanet = planets[Math.floor(Math.random() * planets.length)];
	letters = currentplanet.split("");

	for (var i = 0; i < letters.length; i++) {
		if (i === 0) {
			spaces = "_";
		}
		else {
			spaces = spaces.concat("_");
		}
	}
	var spacesLetters = spaces.split("");
}

function newGame() {
	// When user won
	if (spaces.indexOf("_") === -1) {
		setTimeout(function() { 
			nextGame = confirm("You won!\n\nDo you want to play again?");
			if (nextGame) {
				playGame();
			}
			else {
				reset();
				gameEnded = true;
				play = false;
			}
		}, 100);
	}

	// When user lost
	if (guessesRemaining === 0) {
		setTimeout(function() { 
			nextGame = confirm("You lost. The planet  was: " + currentplanet + ".\n\nDo you want to play again?");
			if (nextGame) {
				playGame();
			}
			else {
				reset();
				gameEnded = true;
				play = false;
			}
		}, 100);
	}
}

// When user presses any key...
document.onkeyup = function(event) {
	userLetter = (event.key).toLowerCase();
	if (keyOptions.indexOf(userLetter) !== -1 && play === true) {
		// Do this if the user wants to keep playing
		if (gameEnded === false) {
			// Check if guessed letter is contained in planet  name
			var correct = false;
			for (var i = 0; i < letters.length; i++) {
				if (userLetter === letters[i].toLowerCase()) {
					spaces = spaces.replaceAt(i, letters[i]);
					correct = true;
				}
				else {
					spaces = spaces.replaceAt(i, spaces[i]);
				}
				(document.getElementById("spaces")).textContent = spaces;
			}
			
			// Check if key pressed is not among guessed letters
			if (guessedLetters.indexOf(userLetter.toUpperCase()) === -1) {

				// Update letters guessed
				guessedLetters.push(userLetter.toUpperCase());
				(document.getElementById("guessedLetters")).textContent = guessedLetters;

				// If guessed letter is not in the planet  name either
				if (correct === false) {
					// Update number of guesses remaining
					guessesRemaining--
					(document.getElementById("guesses")).textContent = guessesRemaining;

					// Update Image
					j++
					var newImg = "assets/images/" + j + ".png";
					(document.getElementById("image")).src = newImg;
				}
			}
		}

		// Game ends
		if (spaces.indexOf("_") === -1 || guessesRemaining === 0) {

			if (spaces.indexOf("_") === -1) {
				(document.getElementById("spaces")).style.letterSpacing = 0;
			}

			(document.getElementById("spaces")).textContent = spaces;

			// User wins
			if (spaces.indexOf("_") === -1 && gameEnded === false) {
				wins++
				(document.getElementById("wins")).textContent = wins;
			}

			// User losses
			if (guessesRemaining === 0 && gameEnded === false) {
				losses++
				(document.getElementById("losses")).textContent = losses;
			}

			newGame();

		}

		n++
	}
}