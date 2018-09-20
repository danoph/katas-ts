const VALID_RANKS = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
]

const VALID_SUITS = [
  "H", "D", "C", "S"
]

export class Game {
  constructor(private cardsString) {
    this.tooManyCards(cardsString);
    this.tooFewCards(cardsString);
    this.duplicateCards(cardsString);
    this.invalidCard(cardsString);
  }

  bestHand() {
    // implement me
  }

  tooManyCards(cardsString) {
    if (cardsString.split(' ').length > 7) {
      throw new Error('Too many cards');
    }
  }

  tooFewCards(cardsString) {
    if (cardsString.split(' ').length < 7) {
      throw new Error('Too few cards');
    }
  }

  duplicateCards(cardsString) {
    const cards = cardsString.split(' ');
    if (new Set(cards).size !== cards.length) {
      throw new Error('Duplicate cards');
    }
  }

  invalidCard(cardsString) {  
    const hand = cardsString.split(' ');
    const cards = hand.map(card => {
      const suit = card.slice(-1);
      const rank = card.slice(0, card.length - 1);
      return [ rank, suit ];
    });
    
    for (let card of cards) {
      const rank = card[0];
      const suit = card[1];

      if (!VALID_RANKS.includes(rank)) throw new Error('Invalid rank');
      if (!VALID_SUITS.includes(suit)) throw new Error('Invalid suit');
    }
  }
}

// export class Hand {
//   constructor(private cards) {

//   }

//   newHand() {

//   }
// }