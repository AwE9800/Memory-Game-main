//kalles kod

// that the variables which should be included in the memory game. board, cards, flip cards, current player, player 1 and 2

let gamePlan = document.getElementById('gamePlan');
let cards = [];
let flippedCards = [];
let matchedcards = [];
let curentPlayer = 1;
let player1Pairs = 0;
let player2Pairs = 0;
let cardSet = images.concat(images);

/*here I write that the index is 1 but can go up to the 12 card, I make a div with class name card. which as I put a properly so it gives me a random image instead of it being in order (math.floor). I set an addEventListener click so that something happens when you press the cards,in this case, I insert the function that will make it possible to turn the cards over. push() function adds an item to the end of an array.appendChild() moves it from its current position to the new position.*/

for (let i = 0; i <= cardSet.length; i++) {
    let card = ;
    card.className = 'card';
    card.dataset.image = images[Math.floor(i / 2)];
    card.addEventListener('click', flippedCards);
    gamePlan.appendChild(card);
    cards.push(card);
}

function shuffleCards() {
    //It starts with a for loop with an iterator value that is less than the length of the by 1, and will count down from that number to 0.
    for (let i = cards.length - 1; i > 0; i--) {
        // this will pick a random index between 0 and the current value of i. Math.random() will generate a random number between 0&1, and then we add (i+1) to make it between our desired range of 0 and our current value of i. Finally Math.floor() will round it down to a whole number insted of a decimal
        let k = Math.floor(Math.random() * (i + 1));
        // This line will swap whatever element is at our curently randomized idex of k, with the index at the value of i.
        let dataStorage = cards[i].dataset.image;
        cards[i].dataset.image = cards[k].dataset.image;
        cards[k].dataset.image = temp;
    }
}
/*flippedCards.length < 2 && !matchedcards.includes(this) check if cards are the same and I use (this) because it's inside this method flipCards(). Classlist.add "player adds a player class to the classList propery" and flippedCards push causes it to push the card from background to front */

function flipCards() {
    if (flippedCards.length < 2 && !matchedcards.includes(this)) {
        this.style.backgroundimage = 'url(' + this.dataset.imgage + ')';
        flippedCards.push(this);
        this.classList.add('player' + curentPlayer);
        /*om 2 kort är lika med 2, så kollar spelet om det är en match på 1000ms */
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

/*
creates a function, that checks if it is the same card that comes up and what should happen if it is the same card. (card1.dataset.image) = if card 1 accesing the value for a specific picture and you get the same picture this cards get a shadow from the curentPlayer so if card1 and card2 are up at the same time. update the score and check the final score when the game is over */

function checkMatch() {
    let card1 = flipCards[0];
    let card2 = flipCards[1];

    if (card1.dataset.image === card2.dataset.image) {
        card1.style.boxshadow = getPlayerBoxShadowColor(curentPlayer);
        card2.style.boxshadow = getPlayerBoxShadowColor(curentPlayer);
        matchedcards.push(card1, card2);
        updateScore();
        checkGameEnd();
    } else {
    /* om card1 och card2 inte är samma så vänds korten tillbaka */
        card1.style.backgroundimage = '';
        card2.style.backgroundimage = '';
        card1.classList.remove('player' + curentPlayer);
        card2.classList.remove('player' + curentPlayer);

        if (curentPlayer === 1) {
            curentPlayer = 2;
        } else {
            curentPlayer = 1;
        }
    }

    flippedCards = [];
}

/*if the current player gets another equal add 1 to the existing value write one more in score for a pair */
function updateScore() {
    if (curentPlayer === 1) {
        player1Pairs++;
        document.getElementById('player1').textContent = 'score: ' + player1Pairs;
    } else {
        player2Pairs++;
        document.getElementById('player2').textContent = 'score: ' + player1Pairs;
    }
}

/* the function that gives the shadow. color and size */

function getPlayerBoxShadowColor(player) {
    if (player === 1) {
        return '5px 5px 20px #f20090';
    } else {
        return '5px 5px 20px #56cfe3';
    }
}
/*if the number of correct pairs you have after these 12 cards is more than the other player's, Then it says you won, player1 ore player2. If it's the other player who has more pairs, it says that person won. And with det widndow.alert(result) instructs the browser to display a dialog with an message of the score */

function checkGameEnd() {
    if (matchedcards.length === cards.length) {
        let result;

        if (player1Pairs > player2Pairs) {
            result = 'player 1 won';
            window.alert(result);
            document.location.reload();
        } else if (player2Pairs > player1Pairs) {
            result = 'player 2 won';
            window.alert(result);
            document.location.reload();
        } else {
            result = "it's a tie";
            window.alert(result);
            document.location.reload;
        }
    }
}
