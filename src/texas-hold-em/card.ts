import { VALID_RANKS, VALID_SUITS } from './constants';

export class Card {
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
  