import { HandValidator } from './hand.validator';
import { HandEvaluator } from './hand.evaluator';
import { Card } from './card';

export class Game {
  private cards;

  constructor(private cardsString) {
    this.cards = this.cardsString.split(' ').map(cardString => new Card(cardString));
    const validator = new HandValidator(this.cards);
    validator.validate();
  }

  bestHand() {
    const evaluator = new HandEvaluator(this.cards);
    return evaluator.evaluate();
  }
}
