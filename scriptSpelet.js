`use strict`;

const namePlayer1 = document.querySelector(`.player1-name`);
const namePlayer1Data = document.querySelector(`.name-player-1-data`);
const namePlayer2 = document.querySelector(`.player2-name`);
const player1 = document.querySelector(`.player1`);
const player2 = document.querySelector(`.player2`);

const playPvpBtn = document.querySelector(`.play-game-btn`);
const playPveBtn = document.querySelector(`.Starta`);
const btnMotAndra = document.querySelector(".btn-mot-andra");
const btnMotDator = document.querySelector(".btn-mot-dator");
const pvpPage = document.querySelector(`.PVP`);
const gamePage = document.querySelector(`.memory-game`);
const sectionMeny = document.querySelector(".section-meny");
const sectionData = document.querySelector(".section-data");

const img = document.querySelector(`.hidden1`);

btnMotAndra.addEventListener("click", function () {
  sectionMeny.classList.add("hidden-meny");
  pvpPage.classList.remove("hidden-pvp");
});

btnMotDator.addEventListener("click", function () {
  sectionMeny.classList.add("hidden-meny");
  sectionData.classList.remove("hidden-data");
});

playPvpBtn.addEventListener(`click`, function () {
  if (namePlayer1.value.trim() !== "") {
    player1.textContent = namePlayer1.value;
  }
  if (namePlayer2.value.trim() !== "") {
    player2.textContent = namePlayer2.value;
  }
  pvpPage.classList.add(`hidden-pvp`);
  gamePage.classList.remove(`hidden-game`);
});
playPveBtn.addEventListener(`click`, function () {
  if (namePlayer1.value.trim() !== "") {
    player1.textContent = namePlayer1.value;
  }
  player2.textContent = `Dator`;
  sectionData.classList.add(`hidden-data`);
  gamePage.classList.remove(`hidden-game`);
});
// Bilderna till memoryt
let images = [
  `assets/Bowser_Jr.png`,
  `assets/Bowser.png`,
  `assets/Daisy.png`,
  `assets/DiddyReturns.png`,
  `assets/Donkey_Kong.png`,
  `assets/Luigi.png`,
  `assets/Mario.png`,
  `assets/Princess_Peach.png`,
  `assets/Toad.png`,
  `assets/Waluigi.png`,
  `assets/Wario.png`,
  `assets/Yoshi.png`,
];

// Blandar bilderna i Oordning och gör dem till 2 av varje
let deck = [];

function shuffleCards() {
  deck = images.concat(images);
  for (let i = 0; i < deck.length; i++) {
    let k = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[k];
    deck[k] = temp;
  }
}
shuffleCards();

// Den här funktionen delar ut bilderna på varje kort
function spreadCards(card) {
  let randomIndex = Math.floor(Math.random() * deck.length);
  let faceBackImg = card.querySelector(".card-face--front img");
  faceBackImg.src = deck[randomIndex];
  deck.splice(randomIndex, 1);
}

let cards = document.querySelectorAll(`.cards`);

// Loopar varje kort så att man sedan kan klicka och vända på dem
for (let i = 0; i < cards.length; i++) {
  spreadCards(cards[i]);

  cards[i].addEventListener(`click`, (e) => {
    cardClicker(cards[i]);
  });
}

//
let openCards = [];

function cardClicker(card) {
  if (openCards.length < 2 && !card.classList.contains("is-flipped")) {
    card.classList.toggle(`is-flipped`);
    openCards.push(card);
    if (openCards.length === 2) {
      setTimeout(cardsMatch, 1000);
    }
  }
}

let clickedCards = [];

function cardsMatch() {
  let card1 = openCards[0].querySelector(".card-face--front > img");
  let card2 = openCards[1].querySelector(".card-face--front > img");
  if (card1.src === card2.src) {
    tooglecards(openCards);
    clickedCards.push(card1, card2);
    updateScore(currentPlayer);
    endGame();
    openCards = [];
  } else {
    openCards[0].classList.toggle(`is-flipped`);
    openCards[1].classList.toggle(`is-flipped`);
    openCards = [];
    switchPlayer();
  }
  console.log(currentPlayer);
}
function tooglecards(card) {
  card[0].querySelector(".card-face--front > img").classList.add(`hidden`);
  card[1].querySelector(".card-face--front > img").classList.add(`hidden`);
  card[0].style.pointerEvents = "none";
  card[1].style.pointerEvents = "none";
}

let scoreboard1 = document.querySelector(`.scoreboard1`);
let scoreboard2 = document.querySelector(`.scoreboard2`);
let currentPlayer = 1;
let score = [0, 0];

function updateScore(player) {
  score[player]++;
  renderscore();
}
function renderscore() {
  scoreboard1.textContent = `Score: ${score[0]}`;
  scoreboard2.textContent = `Score: ${score[1]}`;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  if (currentPlayer === 0) {
    player1.style.color = "#2a9d8f";
    player2.style.color = "";
    scoreboard1.style.color = "#2a9d8f";
    scoreboard2.style.color = "";
  } else if (currentPlayer === 1) {
    player1.style.color = "";
    scoreboard1.style.color = "";
    player2.style.color = "#2a9d8f";
    scoreboard2.style.color = "#2a9d8f";
  }
}
switchPlayer();
console.log(currentPlayer);

let closebtn = document.querySelector(".closebtn");
let alert = document.querySelector(".alert");

function endGame() {
  if (clickedCards.length === cards.length) {
    if (score[0] > score[1]) {
      alert.classList.remove("hidden-winner");
      closebtn.textContent = `${namePlayer1.value} vann`;
    } else if (score[0] < score[1]) {
      alert.classList.remove("hidden-winner");
      closebtn.textContent = `${namePlayer2.value} vann`;
    } else {
      alert.classList.remove("hidden-winner");
      closebtn.textContent = "Det blev lika";
    }
  }
}

document.querySelector(".newgame").addEventListener("click", function () {
  document.location.reload();
});

const resetBtn = document.querySelector(".resetgame");

function removetoogle() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove(`is-flipped`);
    cards[i].style.pointerEvents = "auto";
    setTimeout(() => {
      cards[i]
        .querySelector(".card-face--front > img")
        .classList.remove(`hidden`);
      spreadCards(cards[i]);
    }, 1000);
  }
}

resetBtn.addEventListener("click", function () {
  clickedCards = [];
  openCards = [];
  deck = [];
  score = [0, 0];
  renderscore();
  shuffleCards();
  removetoogle();
});
