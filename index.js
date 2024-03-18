/*----- constants -----*/
const SOURCE_CARDS = [
  {icon :"fa-volleyball", matched: false},
  {icon :"fa-dumbbell", matched: false},
  {icon :"fa-person-swimming", matched: false},
  {icon :"fa-futbol", matched: false},
  {icon :"fa-basketball", matched: false},
  {icon :"fa-football", matched: false},
  {icon :"fa-bowling-ball", matched: false},
  {icon :"fa-medal", matched: false},
  {icon :"fa-motorcycle", matched: false},
  {icon :"fa-heart", matched: false},
];

const CARD_BACK = "fa-question";
/*----- state variables -----*/
let board;
let firstCard;
let secondCard;
let lockBoard;
let timer;

/*----- cached elements  -----*/
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("reset");

/*----- event listeners -----*/
resetBtn.addEventListener("click", init);
boardEl.addEventListener("click", handleClick);

/*----- functions -----*/
init();

function init() {
  board = shuffledCards(SOURCE_CARDS);
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  timer = 0;
  messageEl.innerHTML = "";
  lockBoard = false;
  render();
}
// Shuffle array in place using Fisher–Yates algorithm and duplicate the source card array
function shuffledCards(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array.concat(array);
}
  



