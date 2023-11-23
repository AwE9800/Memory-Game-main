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

let deck = [];

function shuffleCards() {
    deck = images.concat(images);
    for (let i = 0; i < deck.length; i++) {
        let k = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[k];
        deck[k] = temp;
    }
    console.log(deck);
}
shuffleCards();

let cards = document.querySelectorAll(`.cards`);

for (let i = 0; i < cards.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let flippedImage = cards[i].querySelector('.flipped img');
    flippedImage.src = deck[randomIndex];

    cards[i].addEventListener(`click`, function () {
        let unFlipped = this.querySelector(`.unflipped`);
        let flipped = this.querySelector(`.flipped`);

        unFlipped.classList.add(`hidden-card`);
        flipped.classList.remove(`hidden-card`);
    });
    deck.splice(randomIndex, 1);
}
