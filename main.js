const jsConfetti = new JSConfetti();
const WINNING_SCORE = 3;
const FIRST_STREAK_AWARD = 3;
let winStreak = 0;
let threeStreaks = document.getElementById("three-award-streak");
let exitBtnReward = document.getElementById("exit-reward");


/* user buttons */
let winLoseTieBg = document.querySelector('.result-container');
let lapisUserButton = document.getElementById("lapis-user");
let papyrusUserButton = document.getElementById("papyrus-user");
let scalpellusButton = document.getElementById("scalpellus-user");
let userBtnContainer = document.getElementById("user-btn-container");

/* computer buttons */
let lapisCompBtn = document.getElementById("lapis-computer");
let papyrusCompBtn = document.getElementById("papyrus-computer");
let scalpCompBtn = document.getElementById("scalpellus-computer");

let userChoiceText = document.getElementById("user-choice");
let resultText = document.getElementById("result-instruction");
let computerChoiceText = document.getElementById("computer-choice");

let playAgain = document.getElementById("play-again");


let winStreakText = document.getElementById("win-streak");
let computerScore = document.getElementById("computer-score");
let userScore = document.getElementById("user-score");
let computerNumScore = 0;
let userNumScore = 0;


let choices = [lapisUserButton, papyrusUserButton, scalpellusButton];

let userChoice = "";
let computerChoice = "";

function computerChooses() {
  let mainChoices = ["lapis", "papyrus", "scalpellus"];
  computerChoice = mainChoices[Math.floor(Math.random() * mainChoices.length)];
}

function indicateComputerChoice() {
  computerChoiceText.innerText = computerChoice;
}

function clearComputerBtnStyle() {
  let compBtnChoices = [lapisCompBtn, papyrusCompBtn, scalpCompBtn];
  compBtnChoices.forEach(button => {
    button.style.backgroundColor = "#fffdf3";
  })
}

function displayComputerChoice() {
  if (computerChoice === "lapis") {
    lapisCompBtn.style.backgroundColor = "#a9f5ff";
  } else if (computerChoice === "papyrus") {
    papyrusCompBtn.style.backgroundColor = "#f5f537";
  } else if (computerChoice === "scalpellus") {
    scalpCompBtn.style.backgroundColor = "#f44850";
  }
}

function indicateUserChoice() {
  userChoiceText.innerText = `${userChoice}`;
}

function setUserChoice(userChoiceBtn) {
  userChoiceBtn.addEventListener("click", () => {
    if (userChoiceBtn === lapisUserButton) {
      userChoice = "lapis";
    } else if (userChoiceBtn === papyrusUserButton) {
      userChoice = "papyrus";
    } else if (userChoiceBtn === scalpellusButton) {
      userChoice = "scalpellus";
    }
    indicateUserChoice();
  })
}

function userChooses() {
    choices.forEach(choice => {
      setUserChoice(choice);
    })
}
/* Computer Listens to User Choice each time */
function listenUserChoice() {
  choices.forEach(choice => {
    choice.addEventListener("click", () => {
      computerChooses();
      indicateComputerChoice();
      displayComputerChoice();
      determineScore(userChoice, computerChoice);
      setTimeout(() => {
        clearComputerBtnStyle();
      }, 1000)
    })
  })
}

function displayResult(outcome) {
  if (outcome === "tie") {
    resultText.innerText = "It's a tie!"
    winLoseTieBg.style.backgroundColor = "#df7200";
  } else if (outcome === "lose") {
    resultText.innerText = "You lost this round :("
    winLoseTieBg.style.backgroundColor = "#db1919";
  } else if (outcome === "win") {
    resultText.innerText = "You won this round!"
    winLoseTieBg.style.backgroundColor = "#8ec276";
  }
}

function updateNumScore(outcome) {
  if (outcome === "win") {
    userNumScore += 1;
  } else if (outcome === "lose") {
    computerNumScore += 1;
  }
  displayScore();
}

function displayScore() {
  userScore.innerText = String(userNumScore);
  computerScore.innerText = String(computerNumScore);
}

function determineScore(user, computer) {
  const GAME_RULES = {
    lapis: {lapis: "tie", papyrus: "lose", scalpellus: "win"}, 
    scalpellus: {lapis: "lose", papyrus: "win", scalpellus: "tie"}, 
    papyrus: {lapis: "win", papyrus: "tie", scalpellus: "lose"}, 
  }
  let finalUserChoice = GAME_RULES[user];
  let userOutcome = finalUserChoice[computer];
  displayResult(userOutcome);
  updateNumScore(userOutcome);
  outcome();
}

function outcome() {
  if (userNumScore === WINNING_SCORE) {
    winningOutcome()
  } else if (computerNumScore === WINNING_SCORE) {
    losingOutcome();
  }
  endGame();
}

function updateWinStreak() {
  winStreakText.innerText = String(winStreak);
}

function losingOutcome() {
  winStreak = 0;
  jsConfetti.addConfetti({
    emojis: ['😟', '😭']
  })
  resultText.innerText = "SORRY! You lost the game...";
}
function winningOutcome() {
  winStreak += 1;
  resultText.innerText = "YOU WON THE GAME! Congratulations!";
  jsConfetti.addConfetti({
    emojis: ['⭐️', '🏆', '🥳', '💫', '🎉']
  })
}

function anotherRound() {
  playAgain.addEventListener("click", () => {
    winLoseTieBg.style.backgroundColor = "#323431";
    playAgain.style.display = "none";
    userBtnContainer.style.visibility = "visible";
    computerScore.innerText = computerNumScore;
    userScore.innerText = userNumScore;
    computerChoiceText.innerText = "...";
    userChoiceText.innerText = "...";
    resultText.innerText = "pick lapis, papyrus, or scalpellus";
  })
}

function clearScore() {
  computerNumScore = 0;
  userNumScore = 0;
}

function endGame() {
  if (computerNumScore === WINNING_SCORE || userNumScore === WINNING_SCORE) {
    clearScore();
    userBtnContainer.style.visibility = "hidden";
    updateWinStreak();
    if (winStreak === FIRST_STREAK_AWARD) {
      reachThreeStreak();
      exitBtn();
      setTimeout(() => {
        threeStreaks.style.visibility = "hidden";
      }, 8000)
    }
    playAgain.style.display = "inline";
    anotherRound();
  }
}

function reachThreeStreak() {
  threeStreaks.style.visibility = "visible";
  threeStreaks.style.animation = "bounce";
  threeStreaks.style.animationDuration = "2s";
}

function exitBtn()  {
  exitBtnReward.addEventListener("click", () => {
    threeStreaks.style.visibility = "hidden";
  })
}


//gameplay
userChooses();
listenUserChoice();


