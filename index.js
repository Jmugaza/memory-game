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

function ShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({ ...card }, { ...card });
  }
  while (tempCards.length) {
    let randomIndex = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(randomIndex, 1)[0];
    cards.push(card);
  }
  return cards;
}

function startTimer() {
  let timeLeft = GAME_DURATION;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerHTML = `Time Left: ${timeLeft}s`;
    if (timeLeft === 0 || checkForWin()) {
      clearInterval(timer);
      if (timeLeft === 0) {
        messageEl.innerHTML = "Time's up! You lose.";
        gameOver = true;
        renderControls();
      } else {
        messageEl.innerHTML = "Congratulations! You win.";
        gameOver = true;
      }
    }
    if (timeLeft === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function handleClick(e) {
  const cardIdx = parseInt(e.target.id);
  if (gameOver || isNaN(cardIdx) || ignoreClick) return;

  const card = board[cardIdx];

  if (!firstCard) {
    firstCard = card;
    render();
    return;
  }

  if (!secondCard) {
    secondCard = card;
    render(); 

    if (firstCard.img === secondCard.img) {
      firstCard.matched = true;
      secondCard.matched = true;
      firstCard = null;
      secondCard = null;

      messageEl.innerHTML = "Let's go!";
      setTimeout(() => {
        messageEl.innerHTML = "";
        render();
      }, 1000);
    } else {
      ignoreClick = true;
      messageEl.innerHTML = "wrong, Try again!";
      render();
      setTimeout(() => {
        firstCard.matched = false;
        secondCard.matched = false;
        firstCard = null;
        secondCard = null;
        ignoreClick = false;
        render();
        messageEl.innerHTML = "";
      }, 1500);
    }
    return;
  }

  if (firstCard === card || secondCard === card) {
    firstCard = null;
    secondCard = null;
    render();
    return;
  }
}

function renderBoard() {
  board.forEach((card, index) => {
    const cardEl = document.getElementById(index);
    cardEl.src = card.img;
    const src =
      card.matched || card === firstCard || card === secondCard
        ? card.img
        : CARD_BACK;
    cardEl.src = src;
  });
}

function checkForWin() {
  let matchedCards = board.filter((card) => card.matched);
  return matchedCards.length === board.length;
}



function render() {
  renderBoard();
  // renderMessage();
  renderControls();
}

function renderControls() {
  if (gameOver) {
    resetBtn.style.visibility = "visible";
  } else {
    resetBtn.style.visibility = "hidden";
  }
}
