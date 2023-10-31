/* reset button */
const resetBtn = document.getElementById("resetbutton");


function handleClick() {
    window.location.reload();
}


resetBtn.addEventListener('click', handleClick);




/* generating random number for game */


function generateRandom() {
    return 1 + Math.floor(Math.random()*100);
}


let random = generateRandom();


/** implemented wei's advice for using a
 * single pass for add and subtract
 *
 * Before I had add1, add5, sub25, etc. It was repetitive code
 * so it is better to keep things simple.
 *
 * The following two functions uses a parameter in which I substitute the value
 * into the stepUp method.
 *
 */


function add(addnum) {
    document.getElementById("quantity").stepUp(addnum);
}


function sub(subnum) {
    document.getElementById("quantity").stepDown(subnum);
}


/* Enhancement */


function enhance() {
    let chance = 1+Math.floor(Math.random()*100);
    let randomize = 1+Math.floor(Math.random()*8);


    if (chance <= 5) {
        if (randomize == 1) {
            return "Very Cold";
        } else if (randomize == 2) {
            return "Cold";
        } else if (randomize == 3) {
            return "Very Cool";
        } else if (randomize == 4) {
            return "Warm";
        } else if (randomize == 5) {
            return "Very Warm";
        } else if (randomize == 6) {
            return "Hot";
        } else if (randomize == 7) {
            return "Very Hot";
        }
        return "No";
    }
}


/* Determining the user value and seeing if hot or cold */


let guessInput = document.getElementById('quantity');


function determine() {
    let diff = Math.abs(random-guessInput.value);
    if (diff > 55) {
        return "Very Cold";
    } else if (diff <= 55 && diff >= 41) {
        return "Cold";
    } else if (diff <= 40 && diff >= 31) {
        return "Very Cool";
    } else if (diff <= 30 && diff >= 21) {
        return "Cool";
    } else if (diff <= 20 && diff >= 16) {
        return "Warm";
    } else if (diff <= 15 && diff >= 9) {
        return "Very Warm";
    } else if (diff <= 8 && diff >= 6) {
        return "Hot";
    } else if (diff <= 5 && diff > 0) {
        return "Very Hot";
    } else if (diff == 0) {
        return "Bingo!"
    }
}


let commit = document.getElementById('commitbutton');
let guesslog = document.getElementById('guesslog');


/* code for dealing with number of guesses */


let guessesLeftSentence = document.getElementById('guessesLeftSentence');
let warningtext = "You have 1 guess left!";
let losetext = "You have no more guesses left :/ Click the reset button to play again!";
let guessesLeftNum = document.getElementById("guessesLeft");
var defaultGuessesLeft = 5;


/* WHEN COMMIT BUTTON IS CLICKED */


commit.addEventListener('click', () => {
    let num = guessInput.value;
    let status = determine();
    let enhancement = enhance();
    if (defaultGuessesLeft != 0 && status != "Very Hot" && enhancement != "Very Hot" && enhancement != "No") {
        defaultGuessesLeft--;
    }
    if (defaultGuessesLeft == 1) {
        guessesLeftSentence.innerHTML = warningtext.bold();
    }
    if (defaultGuessesLeft == 0 && status != "Bingo!") {
        gameOver();
        guessesLeftSentence.innerHTML = losetext.bold();
        commit.disabled = true;
    }


    if (status == "Bingo!") {
        gameWon();
        commit.disabled = true;
    }


    guessesLeftNum.innerHTML = defaultGuessesLeft;


    let template = `
                <tr>
                    <td>${num}</td>
                    <td>${status}</td>
                </tr>
                    `;


    guesslog.innerHTML += template;
})


/* game over functions */


function gameOver() {
    let over = document.getElementById("gameOver");
    over.textContent = `${"You lose! The correct guess is "+ random}`;
}


function gameWon() {
    let over = document.getElementById("gameOver");
    over.textContent = `${"You've guessed the secret number! Congrats!"}`;
    guessesLeftSentence.textContent = "";
    warningtext.textContent = "";
}
