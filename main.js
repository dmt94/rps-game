const WINNING_SCORE = 3;
const GAME_RULES = {
  lapis: {lapis: "tie", papyrus: "lose", scalpellus: "win"}, 
  scalpellus: {lapis: "lose", papyrus: "win", scalpellus: "tie"}, 
  papyrus: {lapis: "win", papyrus: "tie", scalpellus: "lose"}, 
}

let lapisUserButton = document.getElementById("lapis-user");
let papyrusUserButton = document.getElementById("papyrus-user");
let scalpellusButton = document.getElementById("scalpellus-user");

let userChoiceText = document.getElementById("user-choice");
let resultText = document.getElementById("result-instruction");
let computerChoiceText = document.getElementById("computer-choice");

let computerScore = document.getElementById("computer-score");
let userScore = document.getElementById("user-score");
let computerNumScore = 0;
let userNumScore = 0;

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
      determineScore(userChoice, computerChoice);
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
}


userChooses();
listenUserChoice();