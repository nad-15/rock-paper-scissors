// alert('This is a console game. Please open your dev tools and then go to console!');
const roundIndicator = document.getElementById(`round-indicator`);
const userChoiceDisplay = document.querySelector(`.user-choice-dis`);
const rockButtonUser = document.getElementById(`rockButtonUser`);
const paperButtonUser = document.getElementById(`paperButtonUser`);
const scissorsButtonUser = document.getElementById(`scissorsButtonUser`);
const compChoiceDisplay = document.querySelector(`.comp-choice-dis`);
const compRandomList = document.querySelector(`.comp-random-list`);
const rockButtonComp = document.getElementById(`rockButtonComp`);
const paperButtonComp = document.getElementById(`paperButtonComp`);
const scissorsButtonComp = document.getElementById(`scissorsButtonComp`);
const roundCountLable = document.querySelector(`.round-count-label`);
const roundCount = document.querySelector(`.round-count`);
const roundsContainer = document.querySelector(`.rounds-container`);
const speedControlContainer = document.getElementById(`speedControlContainer`);
const scoreUser = document.querySelector(`.score-user`);
const scoreComp = document.querySelector(`.score-comp`);
const playButton = document.querySelector(`.play-button`);
const stopButton = document.querySelector(`.button-stop`);
const roundHistory = document.querySelector(`.round-history`);



let compSpeed = 100; // ms
const baseSpeed = 100; 
const speedDisplay = document.getElementById("intervalDisplay");

const increaseBtn = document.getElementById("increaseSpeed");
const decreaseBtn = document.getElementById("decreaseSpeed");
const resetBtn = document.getElementById("resetSpeed");

let humanScore = 0;
let computerScore = 0;

let interval;
let compChoice;
let userChoice;
let roundCounter = 1;


//game starts here
playButton.addEventListener('click', () => {

    if (Number(roundCount.value) > 1000 || Number(roundCount.value) < 1) {
        alert(`Invalid Input!! Min Round: 1 Max round: 1000`);
        return;
    }
    compRandomList.innerHTML = ``;
    roundHistory.style.display = 'flex';
    stopButton.style.display = 'flex'
    startRound();
});

stopButton.addEventListener(`click`, () => {
    clearInterval(interval);
    resetRound();
});


function startRound() {
    console.log(`play button click`);
    if (roundCounter > Number(roundCount.value)) {
        resetRound();
    } else {

        //optimize by removing repitition
        rockButtonUser.classList.remove(`disable`);
        paperButtonUser.classList.remove(`disable`);
        scissorsButtonUser.classList.remove(`disable`);
        playButton.classList.add(`disable`);
        speedControlContainer.classList.add(`disable`);
        playButton.textContent = `Next Round`;
        roundsContainer.style.display = 'none';
        roundIndicator.style.display = 'flex';
        roundIndicator.textContent = `Round ${roundCounter} of ${parseInt(roundCount.value)}`;
        userChoiceDisplay.textContent = `?`;
        userChoiceDisplay.style.backgroundColor = ``;
        compChoiceDisplay.style.backgroundColor = '';
        startRandomCompChoice();
    }
}



function resetRound() {
    roundCounter = 1;
    // playButton.textContent = `Play Game`;
    compRandomList.innerHTML = `? ? ?`;

    rockButtonUser.classList.add(`disable`);
    paperButtonUser.classList.add(`disable`);
    scissorsButtonUser.classList.add(`disable`);
    playButton.classList.remove(`disable`);
    speedControlContainer.classList.remove(`disable`);


    humanScore = 0;
    computerScore = 0;
    scoreComp.textContent = 0;
    scoreUser.textContent = 0;
    userChoiceDisplay.textContent = `?`;
    compChoiceDisplay.textContent = `?`;
    userChoiceDisplay.style.backgroundColor = ``;
    compChoiceDisplay.style.backgroundColor = '';
    playButton.textContent = `Play Game`;
    roundIndicator.textContent = ``;
    roundsContainer.style.display = 'flex';
    roundIndicator.style.display = 'none';


    while (roundHistory.children.length > 1) {
        roundHistory.removeChild(roundHistory.lastChild);
    }

    roundHistory.style.display = 'none';
    stopButton.style.display = 'none'
}


// if (humanScore > computerScore) console.log(`\nYou Win!!!`);
// else if (humanScore < computerScore) console.log(`\nComputer Wins!!!`);
// else console.log(`\nTie`);


// function playGame(){
//     const humanSelection = getuserChoice();
//     const computerSelection = getcompChoice();
//     playRound(humanSelection, computerSelection);
// }    



function roundResult() {

    if (userChoice === compChoice) {
        console.log(`Both chose ${userChoice}.\nTie!` + `\n\nScore:\n` + `Player: ${humanScore} | Computer: ${computerScore}`);
        userChoiceDisplay.style.backgroundColor = `#a3c4f3`;
        compChoiceDisplay.style.backgroundColor = '#a3c4f3';
        updateStats("draw"); // Computer wins this round


    } else if (
        (userChoice === `rock` && compChoice === `scissors`) ||  // Rock beats Scissors
        (userChoice === `paper` && compChoice === `rock`) ||  // Paper beats Rock
        (userChoice === `scissors` && compChoice === `paper`)      // Scissors beats Paper
    ) {
        humanScore += 1;
        scoreUser.textContent = humanScore;

        userChoiceDisplay.style.backgroundColor = `#a7d7a7`;
        compChoiceDisplay.style.backgroundColor = '#f4a3a3';
        updateStats("user"); // User wins this round
        // console.log(`Player chose ${userChoice}.\nComputer chose ${compChoice}.\nPlayer Wins!` + `\n\nScore:\n` + `Player: ${humanScore} | Computer: ${computerScore}`);


    } else {
        computerScore += 1;
        scoreComp.textContent = computerScore;
        userChoiceDisplay.style.backgroundColor = `#f4a3a3`;
        compChoiceDisplay.style.backgroundColor = '#a7d7a7';
        updateStats("comp"); // Computer wins this round


        // console.log(`Player chose ${userChoice}.\nComputer chose ${compChoice}.\nComputer Wins!` + `\n\nScore:\n` + `Player: ${humanScore} | Computer: ${computerScore}`);
    }
    getRoundHistory();
}


// function getuserChoice(){
//     // let userChoice=window.prompt("Rock? Paper? or Scissors?");
//         if (userChoice.toLowerCase()==='rock' || userChoice.toLowerCase()==='paper' || userChoice.toLowerCase()==='scissors'){
//             return userChoice.toLowerCase();
//         }
//         else {
//         alert("Invalid choice. Please choose Rock, Paper, or Scissors.");
//         return getuserChoice();
//         }
//     }


function startRandomCompChoice() {
    interval = setInterval(() => {
        compChoiceDisplay.textContent = getcompChoice();
    }, compSpeed); // let user choose speed

}

function getcompChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    compChoice = choices[(Math.floor(Math.random() * 3))];
    if (compChoice === `rock`) {
        // rockButtonComp.style.border = `2px solid blue`;
        // paperButtonComp.style.border = `1px solid black`;
        // scissorsButtonComp.style.border = `1px solid black`;
        // compRandomList.textContent+= '✊';
        compRandomList.innerHTML += '<span class="comp-span">✊</span>';
        // console.log(compRandomList);
        compRandomList.scrollLeft = compRandomList.scrollWidth; // Scroll to the end

        return '✊';
    } else if (compChoice === `paper`) {
        // rockButtonComp.style.border = `1px solid black`;
        // paperButtonComp.style.border = `2px solid blue`;
        // scissorsButtonComp.style.border = `1px solid black`;
        // compRandomList.textContent+= '🖐️';
        compRandomList.innerHTML += '<span class="comp-span">🖐️</span>';
        compRandomList.scrollLeft = compRandomList.scrollWidth; // Scroll to the end

        return `🖐️`;
    } else if (compChoice === `scissors`) {
        // rockButtonComp.style.border = `1px solid black`;
        // paperButtonComp.style.border = `1px solid black`;
        // scissorsButtonComp.style.border = `2px solid blue`;
        // compRandomList.textContent+= '✌️';
        compRandomList.innerHTML += '<span class="comp-span">✌️</span>';
        compRandomList.scrollLeft = compRandomList.scrollWidth; // Scroll to the end

        return `✌️`;
    }
    // return compChoice.toLowerCase();  
}


rockButtonUser.addEventListener('click', () => {
    clearInterval(interval);
    userChoice = `rock`;
    userChoiceDisplay.textContent = '✊';
    roundResult();
    roundCounter++;
    rockButtonUser.classList.add(`disable`);
    paperButtonUser.classList.add(`disable`);
    scissorsButtonUser.classList.add(`disable`);
    playButton.classList.remove(`disable`);
    speedControlContainer.classList.remove(`disable`);
    if (roundCounter > Number(roundCount.value)) {
                stopButton.style.display = 'none'
        showWinner();
    }


});


paperButtonUser.addEventListener('click', () => {
    clearInterval(interval);
    userChoice = `paper`;
    userChoiceDisplay.textContent = `🖐️`;
    roundResult();


    roundCounter++;
    rockButtonUser.classList.add(`disable`);
    paperButtonUser.classList.add(`disable`);
    scissorsButtonUser.classList.add(`disable`);
    playButton.classList.remove(`disable`);
    speedControlContainer.classList.remove(`disable`);

    if (roundCounter > Number(roundCount.value)) {
                stopButton.style.display = 'none'
        showWinner();
    }

});

scissorsButtonUser.addEventListener('click', () => {
    clearInterval(interval);
    userChoice = `scissors`;
    userChoiceDisplay.textContent = `✌️`;
    roundResult();
    roundCounter++;
    rockButtonUser.classList.add(`disable`);
    paperButtonUser.classList.add(`disable`);
    scissorsButtonUser.classList.add(`disable`);
    playButton.classList.remove(`disable`);
    speedControlContainer.classList.remove(`disable`);

    if (roundCounter > Number(roundCount.value)) {
        stopButton.style.display = 'none'
        showWinner();

    }
});

function showWinner() {
    if (humanScore > computerScore) {
        console.log(`\nYou Win!!!`);
        roundIndicator.textContent = `You Win!!!`;
        userChoiceDisplay.style.backgroundColor = '';
        compChoiceDisplay.style.backgroundColor = '';
        userChoiceDisplay.textContent = `😂`;
        compChoiceDisplay.textContent = `😭`;

    }
    else if (humanScore < computerScore) {
        console.log(`\nComputer Wins!!!`);
        roundIndicator.textContent = `Computer Wins!!!`;
        userChoiceDisplay.style.backgroundColor = '';
        compChoiceDisplay.style.backgroundColor = '';
        compChoiceDisplay.textContent = `😂`;
        userChoiceDisplay.textContent = `😭`;
    }
    else {
        console.log(`\nTie`);
        roundIndicator.textContent = `Draw!!!`;
    }

    playButton.textContent = `Reset`;


}


function getRoundHistory() {
    const roundNumber = document.createElement(`div`);
    roundNumber.classList.add(`round-number`);
    const userChoiceHistory = document.createElement('div');
    const compChoiceHistory = document.createElement(`div`);

    roundNumber.textContent = `${roundCounter}`;
    userChoiceHistory.textContent = userChoiceDisplay.textContent;
    compChoiceHistory.textContent = compChoiceDisplay.textContent;
    userChoiceHistory.style.backgroundColor = window.getComputedStyle(userChoiceDisplay).backgroundColor;
    compChoiceHistory.style.backgroundColor = window.getComputedStyle(compChoiceDisplay).backgroundColor;



    const roundResultHistory = document.createElement(`div`);
    roundResultHistory.classList.add(`round-result-history`);

    roundResultHistory.appendChild(roundNumber);
    roundResultHistory.appendChild(userChoiceHistory);
    roundResultHistory.appendChild(compChoiceHistory);


    roundHistory.appendChild(roundResultHistory);
    roundHistory.scrollLeft = roundHistory.scrollWidth;
}



//access local storage saved game stats
document.addEventListener("DOMContentLoaded", displayStats);


// Retrieve stored stats or initialize them
let gameStats = JSON.parse(localStorage.getItem("gameStats")) || {
    userWins: 0,
    compWins: 0,
    draw: 0,
    totalRounds: 0

};

function updateStats(winner) {
    gameStats.totalRounds += 1; // Every round played increases

    if (winner === "user") {
        gameStats.userWins += 1;
    } else if (winner === "comp") {
        gameStats.compWins += 1;
    } else if (winner === "draw") {
        gameStats.draw += 1;
        console.log(gameStats.draw);
    }

    // Save updated stats to local storage
    localStorage.setItem("gameStats", JSON.stringify(gameStats));

    // Update display
    displayStats();
}

function displayStats() {
    // document.getElementById("totalRounds").textContent = gameStats.totalRounds;
    document.getElementById("userWins").textContent = gameStats.userWins;
    document.getElementById(`userLose`).textContent = gameStats.compWins;
    document.getElementById(`userDraw`).textContent = gameStats.draw;

    document.getElementById("compWins").textContent = gameStats.compWins;
    document.getElementById(`compLose`).textContent = gameStats.userWins;
    document.getElementById(`compDraw`).textContent = gameStats.draw;
}


//computer speed modifiers

increaseBtn.addEventListener("click", () => {
    if (compSpeed > 100) {
        compSpeed = Math.max(10, compSpeed - 100); // Limit to 10ms minimum
    } else {
        compSpeed = Math.max(10, compSpeed - 10);
    }

    updateSpeedDisplay();
    console.log(`Speed: ${compSpeed}ms`);
});

decreaseBtn.addEventListener("click", () => {
    if (compSpeed >= 100) {
        compSpeed = Math.min(1000, compSpeed + 100); // Limit to 1000ms maximum
    } else {
        compSpeed = Math.min(1000, compSpeed + 10);
    }

    updateSpeedDisplay();
    console.log(`Speed: ${compSpeed}ms`);
});

resetBtn.addEventListener("click", () => {
    compSpeed = 100; 
    updateSpeedDisplay();
    console.log(`Speed reset: ${compSpeed}ms`);
});


function updateSpeedDisplay() {
    let speedPercentage = baseSpeed / compSpeed; 
    speedDisplay.textContent = `x ${speedPercentage.toFixed(2)}`;
}




let isDown = false;
let startX;
let scrollLeft;

compRandomList.addEventListener("mousedown", (e) => {
    isDown = true;
    compRandomList.classList.add("active");
    startX = e.pageX - compRandomList.offsetLeft;
    scrollLeft = compRandomList.scrollLeft;
});

compRandomList.addEventListener("mouseleave", () => {
    isDown = false;
    compRandomList.classList.remove("active");
});

compRandomList.addEventListener("mouseup", () => {
    isDown = false;
    compRandomList.classList.remove("active");
});

compRandomList.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - compRandomList.offsetLeft;
    const walk = (x - startX) * 2; // Multiply to adjust speed
    compRandomList.scrollLeft = scrollLeft - walk;
});




roundHistory.addEventListener("mousedown", (e) => {
    isDown = true;
    roundHistory.classList.add("active");
    startX = e.pageX - roundHistory.offsetLeft;
    scrollLeft = roundHistory.scrollLeft;
});

roundHistory.addEventListener("mouseleave", () => {
    isDown = false;
    roundHistory.classList.remove("active");
});

roundHistory.addEventListener("mouseup", () => {
    isDown = false;
    roundHistory.classList.remove("active");
});

roundHistory.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - roundHistory.offsetLeft;
    const walk = (x - startX) * 2; // Multiply to adjust speed
    roundHistory.scrollLeft = scrollLeft - walk;
});