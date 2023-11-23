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

let gamePlan = document.getElementById('gamePlan');
let cards = [];
let flippedCards = [];
let matchedcards = [];
let curentPlayer = 1;
let player1Pairs = 0;
let player2Pairs = 0;
let cardSet = images.concat(images);

playPvpBtn.addEventListener(`click`, function () {
    let korteT = document.querySelector(`.kd`);
    let randomBilder = cardSet;
    randomBilder.sort(() => Math.random() - 0.5);
    korteT.append(randomBilder);
});
