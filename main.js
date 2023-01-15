const jsConfetti = new JSConfetti();
const WINNING_SCORE = 3;
const GAME_RULES = {
  lapis: {lapis: "tie", papyrus: "lose", scalpellus: "win"}, 
  scalpellus: {lapis: "lose", papyrus: "win", scalpellus: "tie"}, 
  papyrus: {lapis: "win", papyrus: "tie", scalpellus: "lose"}, 
}
/* user buttons */
let lapisUserButton = document.getElementById("lapis-user");
let papyrusUserButton = document.getElementById("papyrus-user");
let scalpellusButton = document.getElementById("scalpellus-user");

/* computer buttons */
let lapisCompBtn = document.getElementById("lapis-computer");
let papyrusCompBtn = document.getElementById("papyrus-computer");
let scalpCompBtn = document.getElementById("scalpellus-computer");

let userChoiceText = document.getElementById("user-choice");
let resultText = document.getElementById("result-instruction");
let computerChoiceText = document.getElementById("computer-choice");

let playAgain = document.getElementById("play-again");

let computerScore = document.getElementById("computer-score");
let userScore = document.getElementById("user-score");
let computerNumScore = 0;
let userNumScore = 0;

let compBtnChoices = [lapisCompBtn, papyrusCompBtn, scalpCompBtn];
let choices = [lapisUserButton, papyrusUserButton, scalpellusButton];
let mainChoices = ["lapis", "papyrus", "scalpellus"];
let userChoice = "";
let computerChoice = "";

function computerChooses() {
  computerChoice = mainChoices[Math.floor(Math.random() * mainChoices.length)];
}

function indicateComputerChoice() {
  computerChoiceText.innerText = computerChoice;
}

function clearComputerBtnStyle() {
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
  } else if (outcome === "lose") {
    resultText.innerText = "You lost this round :("
  } else if (outcome === "win") {
    resultText.innerText = "You won this round!"
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
function losingOutcome() {
  jsConfetti.addConfetti({
    emojis: ['😟', '😭']
  })
  resultText.innerText = "SORRY! You lost the game...";
}
function winningOutcome() {
  resultText.innerText = "YOU WON THE GAME! Congratulations!";
  jsConfetti.addConfetti({
    emojis: ['⭐️', '🏆', '🥳', '💫', '🎉']
  })
}

function anotherRound() {
  playAgain.addEventListener("click", () => {
    playAgain.style.display = "none";
    computerScore.innerText = computerNumScore;
    userScore.innerText = userNumScore;
    computerChoiceText.innerText = "...";
    userChoiceText.innerText = "...";
  })
}

function clearScore() {
  computerNumScore = 0;
  userNumScore = 0;
}

function endGame() {
  if (computerNumScore === WINNING_SCORE || userNumScore === WINNING_SCORE) {
    clearScore();
    playAgain.style.display = "inline";
    anotherRound();
  }
}

//gameplay
userChooses();
listenUserChoice();


