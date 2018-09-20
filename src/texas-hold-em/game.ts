import { HandValidator } from './hand.validator';
import { Card } from './card';

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
