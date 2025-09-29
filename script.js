// --------------------------------------------
// Environment Variables
// --------------------------------------------

const devArea = document.getElementById("devArea");
const devText = document.getElementById("devArea");
const enterRoomBtn = document.getElementById("enterRoomBtn")
const combatPrompt = document.getElementById("combatPrompt");
const combatPromptText = document.getElementById("combatPromptText");
const roomPrompt1 = document.getElementById("roomPrompt_1");
const roomPrompt2 = document.getElementById("roomPrompt_2");
const dungeon = document.getElementById("dungeon");
const graveyard = document.getElementById("graveyard");
const cardOneContainer = document.getElementById("cardOne");
const cardTwoContainer = document.getElementById("cardTwo");
const cardThreeContainer = document.getElementById("cardThree");
const cardFourContainer = document.getElementById("cardFour");
const healthNum = document.getElementById("health");
const weaponText = document.getElementById("weaponText");
const slainMonster = document.getElementById("slainMonster");
const gameOver = document.getElementById("gameOverPrompt");
const scoreDiv = document.getElementById("score");
const rules = document.getElementById("rulesDiv");

// --------------------------------------------
// Gameplay Variables
// --------------------------------------------

const valueMap = { Jack: 11, Queen: 12, King: 13, Ace: 14 }; // Set values for face cards
let cardOne;
let cardTwo;
let cardThree;
let cardFour;
let tempMonster; // Store temp monster for combat prompt
let equippedWeapon;
let weaponValue = 0;
let slainMonsterValue = 20; // Set this value high so we defer to the weapon if no monster slain
let health = 20; // Can't exceed 20, game is over when this value hits 0
let roomNum = 0; // Number of card evaluated in the room (max 4, needs to be 1 to proceed)
let skipped = false; // Can't skip two rooms in a row
let hasWeapon = false;
let hadPotion = false;
let selectedCard = false; // Use to block button usage if a card is being evaluated or prompt is on screen
let rulesShown = false;
let debugShown = false;

// --------------------------------------------
// Deck Mechanics
// --------------------------------------------

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
        if (this.cards.length === 0) {
            return;
        }
        return this.cards.pop();
    },

    dealHand(handSize) {
        return this.cards.splice(-handSize);
    }
};

const shuffleDeck = () => {
    deck.shuffle();
    renderDeckList();
}

const dealCard = () => {
    deck.dealCard();
    renderDeckList();
}

const discardCard = (card) => {
    deck.dealtCards.push(card);
    graveyard.innerHTML = `<p>Graveyard</p><p>Cards: ${deck.dealtCards.length}</p>`
    renderDeckList();
}

const resetDeck = () => {
    health = 20;
    roomNum = 0;
    weaponValue = 0;
    slainMonsterValue = 20;
    skipped = false;
    hasWeapon = false;
    selectedCard = false;
    tempMonster = undefined;
    equippedWeapon = undefined;
    cardOne = cardTwo = cardThree = cardFour = undefined;
    cardOneContainer.innerHTML = `<button type="button">Card 1</button>`;
    cardTwoContainer.innerHTML = `<button type="button">Card 2</button>`;
    cardThreeContainer.innerHTML = `<button type="button">Card 3</button>`;
    cardFourContainer.innerHTML = `<button type="button">Card 4</button>`;
    enterRoomBtn.innerText = "Enter Room";
    weaponText.innerText = "Weapon";
    slainMonster.style.display = "none";
    slainMonster.innerHTML = `<p>Monster</p>`;
    healthNum.innerText = health;
    combatPromptText.innerText = "How do you want to fight this monster?";

    deck.createDeck();
    deck.addJokers();
    deck.removeCards();
    deck.shuffle();

    hideRoomPrompt();
    renderDeckList();
}

// --------------------------------------------
// Gameplay Mechanics
// --------------------------------------------

const selectCard = (num) => {
    if (!selectedCard) {
        selectedCard = true;
        switch(num) {
            case 1: 
                evaluateCard(cardOne);
                cardOneContainer.innerHTML = `<button type="button">Clear!</button>`;
                cardOne = undefined;
                break;
            case 2:
                evaluateCard(cardTwo);
                cardTwoContainer.innerHTML = `<button type="button">Clear!</button>`;
                cardTwo = undefined;
                break;
            case 3: 
                evaluateCard(cardThree);
                cardThreeContainer.innerHTML = `<button type="button">Clear!</button>`;
                cardThree = undefined;
                break;
            case 4:
                evaluateCard(cardFour);
                cardFourContainer.innerHTML = `<button type="button">Clear!</button>`;
                cardFour = undefined;
                break;
        }
    }
}

const evaluateCard = (card) => {
    if (card == undefined) {
        return
    }
    
    if (roomNum <= 2) {
        enterRoomBtn.innerText = "Enter Room";
    }

    switch (card.suit) {
        case 'Hearts':
            addHealth(card);
            roomNum--;
            break;
        case 'Diamonds':
            setWeapon(card);
            roomNum--;
            break;
        case 'Clubs':
            if (hasWeapon) {
                tempMonster = card;
                combatPrompt.style.display = "block";
            } else {
                evaluateCombat(card, true);
            }
            roomNum--;
            break;
        case 'Spades':
            if (hasWeapon) {
                tempMonster = card;
                combatPrompt.style.display = "block";
            } else {
                evaluateCombat(card, true);
            }
            roomNum--;
            break;
        default:
            // handle jokers or other special cases
        break;
    }
}

const evaluateCombat = (card, barehanded) => {
    const value = valueMap[card.rank] || parseInt(card.rank);

    if (barehanded) {
        health -= value;
        healthNum.innerText = health;
        hideRoomPrompt();
    } else {
        if (value > slainMonsterValue) {
            combatPromptText.innerText = "Your weapon is not strong enough!";
            return;
        }
        let newValue = Math.max(0, value - weaponValue);
        slainMonsterValue = value;
        health -= newValue;
        healthNum.innerText = health;
        slainMonster.style.display = "block";
        slainMonster.innerHTML = `<p>Monster: ${slainMonsterValue}</p>`;
        hideRoomPrompt();
    }

    selectedCard = false;
    tempMonster = undefined;
    discardCard(card);
    checkHealth();
}

const addHealth = (card) => {
    const value = parseInt(card.rank);

    if (!hadPotion) {
        hadPotion = true;
        health += value;
        if (health >= 20) {
            health = 20;
        }
        healthNum.innerText = health;
        selectedCard = false;
        discardCard(card);
    } else {
        selectedCard = false;
        discardCard(card);
    }
}

const setWeapon = (card) => {
    if (hasWeapon) {
        discardCard(equippedWeapon);
    }

    equippedWeapon = card;
    const value = parseInt(card.rank);
    weaponValue = value;
    weaponText.innerText = `Weapon: ${value}`;
    slainMonsterValue = 20;
    weaponText.innerText = `Weapon: ${weaponValue}`;
    slainMonster.style.display = "none";
    slainMonster.innerHTML = `<p>Monster: ${slainMonsterValue}</p>`;
    hasWeapon = true;
    selectedCard = false;
}

const skipRoom = () => {
    skipped = true;

    if (cardOne && cardTwo && cardThree && cardFour) {
        const cards = [cardOne, cardTwo, cardThree, cardFour].sort(() => Math.random() - 0.5);
        deck.cards.unshift(...cards);
    }

    cardOne = undefined;
    cardTwo = undefined;
    cardThree = undefined;
    cardFour = undefined;
    enterRoom();
    hideRoomPrompt();
}

const checkHealth = () => {
    if (health <= 0) {
        health = 0;
        endGame(false);
    }
}

const enterRoom = () => {
    if (deck.cards.length <= 0) {
        endGame(true);
    }

    if (skipped) {
        enterRoomBtn.innerText = "Enter Room";
    } else {
        enterRoomBtn.innerText = "Skip Room";
    }

    const getSuitSymbol = (suit) => {
        switch (suit) {
            case 'Hearts':
                return '&#x2665;';
            case 'Diamonds':
                return '&#x2666;';
            case 'Clubs':
                return '&#x2663;';
            case 'Spades':
                return '&#x2660;';
            default:
                return '';
        }
    }

    if (!selectedCard) {
        if (!cardOne && deck.cards.length > 0) {
            cardOne = deck.dealCard();
            cardOneContainer.innerHTML = `<button type="button" onClick="selectCard(1)"><span style="font-size: 2em;">${getSuitSymbol(cardOne.suit)}</span><br />${cardOne.rank}<br />of<br />${cardOne.suit}</button>`;
        }
        if (!cardTwo && deck.cards.length > 0) {
            cardTwo = deck.dealCard();
            cardTwoContainer.innerHTML = `<button type="button" onClick="selectCard(2)"><span style="font-size: 2em;">${getSuitSymbol(cardTwo.suit)}</span><br />${cardTwo.rank}<br />of<br />${cardTwo.suit}</button>`;
        }
        if (!cardThree && deck.cards.length > 0) {
            cardThree = deck.dealCard();
            cardThreeContainer.innerHTML = `<button type="button" onClick="selectCard(3)"><span style="font-size: 2em;">${getSuitSymbol(cardThree.suit)}</span><br />${cardThree.rank}<br />of<br />${cardThree.suit}</button>`;
        }
        if (!cardFour && deck.cards.length > 0) {
            cardFour = deck.dealCard();
            cardFourContainer.innerHTML = `<button type="button" onClick="selectCard(4)"><span style="font-size: 2em;">${getSuitSymbol(cardFour.suit)}</span><br />${cardFour.rank}<br />of<br />${cardFour.suit}</button>`;
        }
        roomNum = 4;
        hadPotion = false;
        renderDeckList();
    }
}

const endGame = (win) => {
    selectedCard = true;
    let finalValue = 0;

    if (win) {
        const lastHeart = [...deck.dealtCards].reverse().find(card => card.suit === 'Hearts');
        const value = valueMap[lastHeart.rank] || parseInt(lastHeart.rank);
        finalValue = health + value;
    } else {
        finalValue = health - deck.cards.reduce((val, card) => {
            if (card.suit === 'Spades' || card.suit === 'Clubs') {
                const value = valueMap[card.rank] || parseInt(card.rank);
                return val + value;
            }
            return val;
        }, 0);
    }

    scoreDiv.innerHTML = `<b>Game Over!</b><br />Final Score: ${finalValue}</p>`
    gameOver.style.display = "block";
}

// --------------------------------------------
// Prompts
// --------------------------------------------

const hideRoomPrompt = () => {
    roomPrompt1.style.display = "none";
    roomPrompt2.style.display = "none";
    combatPrompt.style.display = "none";
    gameOver.style.display = "none";
    combatPromptText.innerText = "How do you want to fight this monster?";
}

const showRoomPrompt = () => {
    if (roomNum <= 1) {
        enterRoom();
        hideRoomPrompt();
    } else if (skipped) {
        roomPrompt2.style.display = "block";
    } else if (roomNum == 4) {
        roomPrompt1.style.display = "block";
    } else if (roomNum != 1) {
        roomPrompt2.style.display = "block";
    }
}

const showRules = () => {
    if (rulesShown) {
        rules.style.display = "none";
        rulesShown = false;
    } else {
        rules.style.display = "block";
        rulesShown = true;
    };
}

const showDebug = () => {
    if (debugShown) {
        devArea.style.display = "none";
        debugShown = false;
    } else {
        devArea.style.display = "block";
        debugShown = true;
    };
}

// --------------------------------------------
// Rendering
// --------------------------------------------

const renderDeckList = () => {
    renderDebug();
    dungeon.innerHTML = `<p>Dungeon<br />Remaining: <b>${deck.cards.length}</b></p>`;
    graveyard.innerHTML = `<p>Graveyard<br />Cards: <b>${deck.dealtCards.length}</b></p>`;
}

const renderDebug = () => {
    const getSuitSymbol = (suit) => {
        switch (suit) {
            case 'Hearts':
                return '&#x2665;';
            case 'Diamonds':
                return '&#x2666;';
            case 'Clubs':
                return '&#x2663;';
            case 'Spades':
                return '&#x2660;';
            default:
                return '';
        }
    }

    const dealtCardsList = deck.dealtCards.map((card) => {
        const color = (card.suit === 'Hearts' || card.suit === 'Diamonds' || card.suit === 'Red Joker') ? 'red' : 'black';
        return `<li style="color: ${color}">${getSuitSymbol(card.suit)} ${card.rank}${card.suit !== 'Red Joker' && card.suit !== 'Black Joker' ? ' of ' + card.suit : ''}</li>`;
    }).join('');

    const deckList = deck.cards.map(card => {
        const color = (card.suit === 'Hearts' || card.suit === 'Diamonds' || card.suit === 'Red Joker') ? 'red' : 'black';
        return `<li style="color: ${color}">${getSuitSymbol(card.suit)} ${card.rank}${card.suit !== 'Red Joker' && card.suit !== 'Black Joker' ? ' of ' + card.suit : ''}</li>`;
    }).join('');

    devText.innerHTML = `
        <h3>Graveyard</h3>
        <ol>${dealtCardsList}</ol>
        <h3>Dungeon</h3>
        <ol>${deckList}</ol>
    `;
}

// --------------------------------------------
// Automatic Start
// --------------------------------------------

deck.createDeck();
deck.addJokers();
deck.removeCards();
shuffleDeck();
