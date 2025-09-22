const devText = document.getElementById("devArea");

const deck = {
  suits: ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
  ranks: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'],
  cards: [],

  createDeck() {
    this.cards = [];
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.cards.push({ suit, rank });
      }
    }
  },

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  },

  dealCard() {
    return this.cards.pop();
  },

  dealHand(handSize) {
    return this.cards.splice(-handSize);
  }
};

// Example usage:
deck.createDeck();
console.log('Initial deck:', deck.cards);

deck.shuffle();
console.log('Shuffled deck:', deck.cards);
devText.innerText = "Shuffled Deck:\n\n" + deck.cards.map(card => `${card.rank} of ${card.suit}`).join('\n');

const card = deck.dealCard();
console.log('Dealt card:', card);

const hand = deck.dealHand(5);
console.log('Dealt hand:', hand);