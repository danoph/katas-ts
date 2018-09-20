const VALID_RANKS = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
]

const VALID_SUITS = [
  "H", "D", "C", "S"
]

export class Game {
  constructor(private cardsString) {
    if (this.tooManyCards(cardsString)) {
      throw new Error('Too many cards');
    } else if (this.tooFewCards(cardsString)) {
      throw new Error('Too few cards');
    } else if (this.duplicateCards(cardsString)) {
      throw new Error('Duplicate cards');
    } else if (this.invalidCard(cardsString)) {
      throw new Error('Invalid card');
    }
  }

  bestHand() {
    // implement me
  }

  tooManyCards(cardsString) {
    if (cardsString.split(' ').length > 7) return true;
  }

  tooFewCards(cardsString) {
    if (cardsString.split(' ').length < 7) return true;
  }

  duplicateCards(cardsString) {
    const cards = cardsString.split(' ');
    return new Set(cards).size !== cards.length;
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

      if (!VALID_RANKS.includes(rank) || !VALID_SUITS.includes(suit)) {
        return true;
      }
    }
    return false;
  }

}

// export class Hand {
//   constructor(private cards) {

//   }

//   newHand() {

//   }
// }