const devText = document.getElementById("devArea");

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
        this.dealtCards.push(card);
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
shuffleDeck = () => {
    deck.shuffle();
    renderDeckList();
}

resetDeck = () => {
    deck.createDeck();
    deck.addJokers();
    deck.removeCards();
    renderDeckList();
}

dealCard = () => {
    deck.dealCard();
    renderDeckList();
}

renderDeckList = () => {
    const dealtCardsList = deck.dealtCards.map((card) => {
        const color = (card.suit === 'Hearts' || card.suit === 'Diamonds' || card.suit === 'Red Joker') ? 'red' : 'black';
        return `<li style="color: ${color}">${card.rank}${card.suit !== 'Red Joker' && card.suit !== 'Black Joker' ? ' of ' + card.suit : ''}</li>`;
    }).join('');
    const deckList = deck.cards.map(card => {
        const color = (card.suit === 'Hearts' || card.suit === 'Diamonds' || card.suit === 'Red Joker') ? 'red' : 'black';
        return `<li style="color: ${color}">${card.rank}${card.suit !== 'Red Joker' && card.suit !== 'Black Joker' ? ' of ' + card.suit : ''}</li>`;
    }).join('');
    devText.innerHTML = `
        <h2>Dealt Cards</h2><ol>${dealtCardsList}</ol>
        <h2>Current Deck</h2><ol>${deckList}</ol>
    `;
}

deck.createDeck();
deck.addJokers();
deck.removeCards();
renderDeckList();