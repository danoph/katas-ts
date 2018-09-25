import { HighCard, TwoOfAKind, TwoPair, ThreeOfAKind, FourOfAKind, FullHouse, Straight, Flush, StraightFlush } from './hand';

export class HandEvaluator {
    constructor(private cards) {}

    public evaluate() {
        const hands = [
            new HighCard(this.cards).evaluate(),
            new TwoOfAKind(this.cards).evaluate(),
            new TwoPair(this.cards).evaluate(),
            new ThreeOfAKind(this.cards).evaluate(),
            new FourOfAKind(this.cards).evaluate(),
            new FullHouse(this.cards).evaluate(),
            new Straight(this.cards).evaluate(),
            new Flush(this.cards).evaluate(),
            new StraightFlush(this.cards).evaluate()
        ].filter(hand => hand);
        return this.getBestHand(hands);
    }

    getBestHand(hands) {
        return hands.reduce((bestHand, hand) => {
          return hand.weight < bestHand.weight ? hand : bestHand
        }).message;
    }
}



