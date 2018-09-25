import { VALID_RANKS } from './constants';

export class HandEvaluator {
    public dupes;

    constructor(public cards) {
        this.dupes = this.getDuplicates();
    }

    public evaluateHand() {
        this.evaluateOrder();
        if (this.dupes.length) {
            const hands = [
                new TwoOfAKind(this.cards).evaluate(),
                new TwoPair(this.cards).evaluate(),
                new ThreeOfAKind(this.cards).evaluate(),
                new FourOfAKind(this.cards).evaluate()
            ].filter(hand => hand);
            return this.getBestHand(hands);
        } else {
            return new HighCard(this.cards).evaluate().message;
        }
    }

    getBestHand(hands) {
        console.log('HANDS: ' , hands);
        return hands.reduce((bestHand, hand) => {
          return hand.weight < bestHand.weight ? hand : bestHand
        }).message;
    }
    
    getHighRankCard(cards) {
        return cards.reduce((highCard, card) =>
        card.rankValue > highCard.rankValue ? card : highCard,
        { rankValue: -1 }
        ).rank;
    }

    getDuplicates() {
        let rankCounts = {};

        for (let card of this.cards) {
        rankCounts[card.rank] = rankCounts[card.rank] || [];
        rankCounts[card.rank].push(card);
        }

        return Object.keys(rankCounts)
        .filter(rank => rankCounts[rank].length > 1)
        .map(rank => rankCounts[rank])
        // .reduce((acc, rank) => rankCounts[rank], [])
        //.reduce((acc, rank) => acc.concat(rankCounts[rank]), [])
    }

    evaluateOrder() {
        //numArray.sort((a, b) => a - b)

        //console.log('CARD MAP BY RANK: ',this.cards.map(card => VALID_RANKS.indexOf(card.rank)))

        const sortedCards = this.cards.map(card => VALID_RANKS.indexOf(card.rank))
        .sort((a, b) => a - b);

        console.log(sortedCards);
    }
}

class HighCard extends HandEvaluator {
    weight: number;
    message: string;

    evaluate() {
        return {
            weight: 9,
            message: `High Card (${this.getHighRankCard(this.cards)} high)`
        }
    }
}

class TwoOfAKind extends HandEvaluator {
    rank: string;
    weight: number;

    evaluate() {
        if (this.dupes.length === 1 && this.dupes[0].length === 2) {
            return {
                weight: 8,
                message: `Two of a Kind (${this.getHighRankCard(this.dupes[0])} high)`
            }
        }
    }
}

class TwoPair extends HandEvaluator {
    rank: string;
    weight: number;

    evaluate() {
        if (this.dupes.length === 2 && this.dupes[0].length === 2 && this.dupes[1].length === 2) {
            return {
                weight: 7,
                message: `Two Pair (${this.getHighRankCard([...this.dupes[0], ...this.dupes[1]])} high)`
            }
        }
    }
}

class ThreeOfAKind extends HandEvaluator {
    rank: string;
    weight: number;

    evaluate() {
        console.log('this.dupes: ' , this.dupes);
        if (this.dupes.length === 1 && this.dupes[0].length === 3) {
            return {
                weight: 6,
                message: `Three of a Kind (${this.getHighRankCard(this.dupes[0])} high)`
            }
        }
    }
}

class FourOfAKind extends HandEvaluator {
    rank: string;
    weight: number;

    evaluate() {
        if (this.dupes.length === 1 && this.dupes[0].length === 4) {
            return {
                weight: 2,
                message: `Four of a Kind (${this.getHighRankCard(this.dupes[0])} high)`
            }
        }
    }
}

