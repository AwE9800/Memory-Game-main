`use strict`;

const namePlayer1 = document.querySelector(`.player1-name`);
const namePlayer1Data = document.querySelector(`.name-player-1-data`);
const namePlayer2 = document.querySelector(`.player2-name`);
const player1 = document.querySelector(`.player1`);
const player2 = document.querySelector(`.player2`);

const playPvpBtn = document.querySelector(`.play-game-btn`);
const playPveBtn = document.querySelector(`.Starta`);
const btnMotAndra = document.querySelector('.btn-mot-andra');
const btnMotDator = document.querySelector('.btn-mot-dator');
const pvpPage = document.querySelector(`.PVP`);
const gamePage = document.querySelector(`.memory-game`);
const sectionMeny = document.querySelector('.section-meny');
const sectionData = document.querySelector('.section-data');

const img = document.querySelector(`.hidden1`);

btnMotAndra.addEventListener('click', function () {
    sectionMeny.classList.add('hidden-meny');
    pvpPage.classList.remove('hidden-pvp');
});

btnMotDator.addEventListener('click', function () {
    sectionMeny.classList.add('hidden-meny');
    sectionData.classList.remove('hidden-data');
});

playPvpBtn.addEventListener(`click`, function () {
    player1.textContent = namePlayer1.value;
    player2.textContent = namePlayer2.value;
    pvpPage.classList.add(`hidden-pvp`);
    gamePage.classList.remove(`hidden-game`);
});
playPveBtn.addEventListener(`click`, function () {
    player1.textContent = namePlayer1Data.value;
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

let cards = document.querySelectorAll(`.cards`);
let openCards = [];
let cardCheck = true;
for (let i = 0; i < cards.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let faceBackImg = cards[i].querySelector('.card-face--front img');
    faceBackImg.src = deck[randomIndex];

    cards[i].addEventListener(`click`, function cardClicker() {
        if (openCards.length < 2 && cardCheck && !cards[i].classList.contains('is-flipped')) {
            cards[i].classList.toggle(`is-flipped`);
            openCards.push(cards[i]);
            if (openCards.length === 2) {
                setTimeout(cardsMatch, 1000);
            }
        }
    });
    deck.splice(randomIndex, 1);
}
let clickedCards = [];

function cardsMatch() {
    let card1 = openCards[0].querySelector('.card-face--front > img');
    let card2 = openCards[1].querySelector('.card-face--front > img');
    if (card1.src === card2.src) {
        card1.classList.add(`hidden`);
        card2.classList.add(`hidden`);
        openCards[0].style.pointerEvents = 'none';
        openCards[1].style.pointerEvents = 'none';
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
    console.log(clickedCards);
}

let scoreboard1 = document.querySelector(`.scoreboard1`);
let scoreboard2 = document.querySelector(`.scoreboard2`);
let currentPlayer = 0;
let score = [0, 0];

function updateScore(player) {
    score[player]++;
    scoreboard1.textContent = `Score: ${score[0]}`;
    scoreboard2.textContent = `Score: ${score[1]}`;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
}

function endGame() {
    if (clickedCards.length === cards.length) {
        if (score[0] > score[1]) {
            alert(`${player1.value} vann`);
        } else if (score[0] < score[1]) {
            alert(`${player2.value} vann`);
        } else {
            console.log(`Det blev lika!`);
        }
    }
}
