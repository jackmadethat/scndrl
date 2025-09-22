const devText = document.getElementById("devArea");
const combatPrompt = document.getElementById("combatPrompt");
const roomPrompt1 = document.getElementById("roomPrompt_1");
const roomPrompt2 = document.getElementById("roomPrompt_2");
const dungeon = document.getElementById("dungeon");
const graveyard = document.getElementById("graveyard");
const cardOneContainer = document.getElementById("cardOne");
const cardTwoContainer = document.getElementById("cardTwo");
const cardThreeContainer = document.getElementById("cardThree");
const cardFourContainer = document.getElementById("cardFour");
let cardOne;
let cardTwo;
let cardThree;
let cardFour;
let roomNum = 0;
let skipped = false;

const showCombatPrompt = (show, num) => {
    switch(num) {
        case 1: 
            console.log(cardOne);
            break;
        case 2:
            console.log(cardTwo);
            break;
        case 3: 
            console.log(cardThree);
            break;
        case 4:
            console.log(cardFour);
            break;
    }
    
    if (show) {
        combatPrompt.style.display = "block";
    } else {
        combatPrompt.style.display = "none";
    }   
}

const hideRoomPrompt = () => {
    roomPrompt1.style.display = "none";
    roomPrompt2.style.display = "none";
}

const showRoomPrompt = () => {
    if (roomNum <= 1) {
        enterRoom();
        hideRoomPrompt();
    } else if (skipped) {
        roomPrompt2.style.display = "block";
    } else {
        roomPrompt1.style.display = "block";
    }
}

const skipRoom = () => {
    skipped = true;
    enterRoom();
    hideRoomPrompt();
}

const deck = {
    suits: ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
    ranks: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'],
    cards: [],
    dealtCards: [],
    cardsToRemove: [
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'King', suit: 'Hearts' },
        { rank: 'Queen', suit: 'Hearts' },
        { rank: 'Jack', suit: 'Hearts' },
        { rank: 'Ace', suit: 'Diamonds' },
        { rank: 'King', suit: 'Diamonds' },
        { rank: 'Queen', suit: 'Diamonds' },
        { rank: 'Jack', suit: 'Diamonds' },
        { rank: 'Red Joker', suit: 'Red Joker' },
        { rank: 'Black Joker', suit: 'Black Joker' }
    ],

    createDeck() {
        this.cards = [];
        this.dealtCards = [];
        for (const suit of this.suits) {
            for (const rank of this.ranks) {
                this.cards.push({ suit, rank });
            }
        }
    },

    addJokers() {
        this.cards.push({ suit: 'Red Joker', rank: 'Red Joker' });
        this.cards.push({ suit: 'Black Joker', rank: 'Black Joker' });
    },

    removeCards() {
        this.cards = this.cards.filter(card => {
            return !this.cardsToRemove.some(removeCard => 
                removeCard.rank === card.rank && removeCard.suit === card.suit
            );
        });
    },

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    },

    dealCard() {
        const card = this.cards.pop();
        //this.dealtCards.push(card);
        return card;
    },

    dealHand(handSize) {
        return this.cards.splice(-handSize);
    }
};

// Example usage:
/*
deck.createDeck();
deck.addJokers();
console.log('Initial deck:', deck.cards);

deck.shuffle();
console.log('Shuffled deck:', deck.cards);

const card = deck.dealCard();
console.log('Dealt card:', card);

const hand = deck.dealHand(5);
console.log('Dealt hand:', hand);
*/

// Implementation
const shuffleDeck = () => {
    deck.shuffle();
    renderDeckList();
}

const resetDeck = () => {
    deck.createDeck();
    deck.addJokers();
    deck.removeCards();
    renderDeckList();
    cardOneContainer.innerHTML = `<p>Card 1</p>`;
    cardTwoContainer.innerHTML = `<p>Card 2</p>`;
    cardThreeContainer.innerHTML = `<p>Card 3</p>`;
    cardFourContainer.innerHTML = `<p>Card 4</p>`;
}

const dealCard = () => {
    deck.dealCard();
    renderDeckList();
}

const enterRoom = () => {
    const cards = [deck.dealCard(), deck.dealCard(), deck.dealCard(), deck.dealCard()];
    cardOne = cards[0];
    cardTwo = cards[1];
    cardThree = cards[2];
    cardFour = cards[3];

    document.getElementById("cardOne").innerHTML = `<p>${cardOne.rank}<br />of<br />${cardOne.suit}</p>`;
    document.getElementById("cardTwo").innerHTML = `<p>${cardTwo.rank}<br />of<br />${cardTwo.suit}</p>`;
    document.getElementById("cardThree").innerHTML = `<p>${cardThree.rank}<br />of<br />${cardThree.suit}</p>`;
    document.getElementById("cardFour").innerHTML = `<p>${cardFour.rank}<br />of<br />${cardFour.suit}</p>`;

    roomNum = 4;

    renderDeckList();
}

const renderDeckList = () => {
    const dealtCardsList = deck.dealtCards.map((card) => {
        const color = (card.suit === 'Hearts' || card.suit === 'Diamonds' || card.suit === 'Red Joker') ? 'red' : 'black';
        return `<li style="color: ${color}">${card.rank}${card.suit !== 'Red Joker' && card.suit !== 'Black Joker' ? ' of ' + card.suit : ''}</li>`;
    }).join('');
    const deckList = deck.cards.map(card => {
        const color = (card.suit === 'Hearts' || card.suit === 'Diamonds' || card.suit === 'Red Joker') ? 'red' : 'black';
        return `<li style="color: ${color}">${card.rank}${card.suit !== 'Red Joker' && card.suit !== 'Black Joker' ? ' of ' + card.suit : ''}</li>`;
    }).join('');
    devText.innerHTML = `
        <h2>Dealt Cards</h2>
        <ol>${dealtCardsList}</ol>
        <h2>Current Deck</h2>
        <ol>${deckList}</ol>
    `;
    dungeon.innerHTML = `<p>Dungeon</p><p>Remaining: ${deck.cards.length}</p>`
    graveyard.innerHTML = `<p>Graveyard</p><p>Cards: ${deck.dealtCards.length}</p>`
}

deck.createDeck();
deck.addJokers();
deck.removeCards();
renderDeckList();