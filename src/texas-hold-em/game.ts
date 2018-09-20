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

  get rankValue() {
    return VALID_RANKS.indexOf(this.rank);
  }
}

class HandValidator {
  constructor(private cards) {

  }

  validate() {
    this.tooManyCards();
    this.tooFewCards();
    this.duplicateCards();
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

export class Game {
  private cards;

  constructor(private cardsString) {
    this.cards = this.cardsString.split(' ').map(cardString => new Card(cardString));
    const validator = new HandValidator(this.cards);
    validator.validate();
  }

  bestHand() {
    let rankCounts = {};

    for (let card of this.cards) {
      rankCounts[card.rank] = rankCounts[card.rank] || [];
      rankCounts[card.rank].push(card);
    }

    const dupes = Object.keys(rankCounts)
      .filter(rank => rankCounts[rank].length > 1)
      .reduce((acc, rank) => acc.concat(rankCounts[rank]), [])

    if (dupes.length === 2) {
      return `Two of a Kind (${this.getHighRankCard(dupes).rank} high)`;
    } else if (dupes.length === 4) {
      return `Two Pair (${this.getHighRankCard(dupes).rank} high)`;
    } else {
      return `High Card (${this.getHighRankCard(this.cards).rank} high)`;
    }
    
  }

  getHighRankCard(cards) {
    return cards.reduce((highCard, card) =>
      card.rankValue > highCard.rankValue ? card : highCard,
      { rankValue: -1 }
    );
  }
}
