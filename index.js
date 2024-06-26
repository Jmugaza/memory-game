/*----- constants -----*/
const SOURCE_CARDS = [
  { img: "images/baseball.png", matched: false },
  { img: "images/basketball.png", matched: false },
  { img: "images/bowlingball.png", matched: false },
  { img: "images/dumbbell.png", matched: false },
  { img: "images/football.png", matched: false },
  { img: "images/futbol.png", matched: false },
  { img: "images/heart.png", matched: false },
  { img: "images/medal.png", matched: false },
  { img: "images/motocycle.png", matched: false },
  { img: "images/swimming-person.png", matched: false },
];

const CARD_BACK = "images/question.png";

const GAME_DURATION = 80; // seconds

/*----- state variables -----*/
let board;
let firstCard;
let secondCard;
let ignoreClick;
let gameOver;
let timer; //time remaining

/*----- cached elements  -----*/
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("reset");

/*----- event listeners -----*/
boardEl.addEventListener("click", handleClick);
resetBtn.addEventListener("click", init);

/*----- functions -----*/
init();

//Initialize the game by creating a new board with shuffled cards
function init() {
  board = ShuffledCards();
  firstCard = null;
  secondCard = null;
  ignoreClick = false;
  gameOver = false;
  messageEl.innerHTML = "";
  startTimer();
  render();
}

// Function to shuffle a given array of card objects
function ShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({ ...card }, { ...card });
  }
  while (tempCards.length) {
    let randomIndex = Math.floor(Math.random() * tempCards.length);

    // Remove and store the card object at the randomly generated index
    let card = tempCards.splice(randomIndex, 1)[0];
    cards.push(card);
  }
  return cards;
}

// Function to start the game timer
function startTimer() {
  let timeLeft = GAME_DURATION;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerHTML = `Time Left: ${timeLeft}s`;

    // Check if the time left is 0 or if the user has won
    if (timeLeft === 0 || checkForWin()) {
      clearInterval(timer);
      gameOver = true;
      render();
    }
  }, 1000);
}

// Handles the click event on a card in the game board
function handleClick(e) {
  const cardIdx = parseInt(e.target.id);
  if (gameOver || isNaN(cardIdx) || ignoreClick) return;

  const card = board[cardIdx];

  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    checkMatch();
  } else {
    firstCard  = null;
    secondCard = null;
    firstCard = card;
  }
  render();
}

// Check if the selected cards match
function checkMatch() {
  if (firstCard.img === secondCard.img) {
    firstCard.matched = true;
    secondCard.matched = true;
    messageEl.innerHTML = "Let's go!";
    setTimeout(() => {
      messageEl.innerHTML = "";
      render();
    }, 1000);
  } else {
    ignoreClick = true;
    messageEl.innerHTML = "Wrong, Try again!";
    setTimeout(() => {
      firstCard = null;
      secondCard = null;
      ignoreClick = false;
      render();
      messageEl.innerHTML = "";
    }, 1000);
  }
}

// Check if the player has won the game
function checkForWin() {
  let matchedCards = board.filter((card) => card.matched);
  return matchedCards.length === board.length;
}

// This function used to display a message to the user
function renderMessage() {
  if (gameOver) {
    if (checkForWin()) {
      messageEl.innerHTML = "Congratulations! You win.";
    } else {
      messageEl.innerHTML = "Time's up! You lost.";
    }
  }
}

// renderBoard function iterates through each card in the board array and updates the corresponding DOM element with the card's image.
function renderBoard() {
  board.forEach((card, index) => {
    const cardEl = document.getElementById(index);
    cardEl.src = card.img;

    // Determine the source for the card's image based on whether it has been matched or is currently being compared
    const src =
      card.matched || card === firstCard || card === secondCard
        ? card.img
        : CARD_BACK;
    cardEl.src = src;
  });
}

function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function renderControls() {
  if (gameOver) {
    resetBtn.style.visibility = "visible";
  } else {
    resetBtn.style.visibility = "hidden";
  }
}
