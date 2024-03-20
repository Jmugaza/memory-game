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
let gamerOver;
let timer; //time remaining

/*----- cached elements  -----*/
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("reset");

/*----- event listeners -----*/
boardEl.addEventListener("click", handleClick)
resetBtn.addEventListener("click", init)


/*----- functions -----*/

init();
function init() {
  board = ShuffledCards();
  firstCard = null;
  secondCard = null;
  ignoreClick = false;
  gamerOver = false;
  messageEl.innerHTML = '';
  startTimer();
  render();
}

function ShuffledCards() {
  let tempCards = []
  let cards = []
  for (let card of SOURCE_CARDS){
    tempCards.push({...card}, {...card})
  }
  while (tempCards.length) {
    let randomIndex = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(randomIndex, 1)[0];
    cards.push(card);
  }
  return cards;
}

function handleClick(e){
  const cardIdx = parseInt(e.target.id);
  if (gamerOver || isNaN(cardIdx) || ignoreClick) return;

  const card = board[cardIdx];

  if (!firstCard) {
    firstCard = card;
    render();
    return;
  }

  if (firstCard === card) {
    firstCard = null;
    render();
    return;
  }

  if (firstCard.img === card.img) {
    firstCard.matched = true;
    card.matched = true;
    firstCard = null;
    messageEl.innerHTML = "Let's go!"; // Display message for match
    render();
    setTimeout(() => {
      messageEl.innerHTML = ""; // Clear the message
      render();
    }, 1000);
  } else {
    ignoreClick = true;
    setTimeout(() => {
      messageEl.innerHTML = "wrong, Try again!"; // Display message for wrong match
      render(); // Render the board to show the wrong message
    }, 500); // Adjust this delay as needed
    setTimeout(() => {
      messageEl.innerHTML = ""; // Clear the message
      firstCard = null;
      ignoreClick = false;
      render();
    }, 1500); // Adjust this delay as needed
  }
}

