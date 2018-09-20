const VALID_RANKS = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
]

const VALID_SUITS = [
  "H", "D", "C", "S"
]

class Card {
  rank: string;
  suit: string;

  constructor(cardString) {
    this.suit = cardString.slice(-1);
    this.rank = cardString.slice(0, cardString.length - 1);

    if (!VALID_RANKS.includes(this.rank)) throw new Error('Invalid rank');
    if (!VALID_SUITS.includes(this.suit)) throw new Error('Invalid suit');
  }
}

export class Game {
  private cards;

  constructor(private cardsString) {
    this.cards = this.cardsString.split(' ').map(cardString => new Card(cardString));

    this.tooManyCards();
    this.tooFewCards();
    this.duplicateCards();
  }

  bestHand() {
    let highRankIndex = 0;
    let highRankCard;

    for (let card of this.cards) {
      const currentRankIndex = VALID_RANKS.indexOf(card.rank);

      if (currentRankIndex > highRankIndex) {
        highRankIndex = currentRankIndex;
        highRankCard = card;
      } 
    }

    let rankCounts = {};

    for (let card of this.cards) {
      rankCounts[card.rank] = rankCounts[card.rank] || 0;
      rankCounts[card.rank] += 1;
    }

    const dupes = Object.keys(rankCounts).filter(rank => rankCounts[rank] > 1);

    if (dupes.length) {
      return `Two of a Kind (${dupes[0]} high)`;
    } else {
      return `High Card (${highRankCard.rank} high)`;
    }
    
  }

  tooManyCards() {
    if (this.cards.length > 7) {
      throw new Error('Too many cards');
    }
  }

  tooFewCards() {
    if (this.cards.length < 7) {
      throw new Error('Too few cards');
    }
  }

  duplicateCards() {
    const duplicates = this.cards
      .filter(card => this.cards
        .find(card2 => card !== card2 && card2.rank === card.rank && card2.suit === card.suit)
      )

    if (duplicates.length) {
      throw new Error('Duplicate cards');
    }
  }
}
