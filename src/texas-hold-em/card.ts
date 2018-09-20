export class Card {
    VALID_RANKS = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" ]
    VALID_SUITS = [ "H", "D", "C", "S" ]

    rank: string;
    suit: string;

    constructor(cardString) {
        this.suit = cardString.slice(-1);
        this.rank = cardString.slice(0, cardString.length - 1);

        if (!this.VALID_RANKS.includes(this.rank)) throw new Error('Invalid rank');
        if (!this.VALID_SUITS.includes(this.suit)) throw new Error('Invalid suit');
    }

    get rankValue() {
        return this.VALID_RANKS.indexOf(this.rank);
    }
}
  