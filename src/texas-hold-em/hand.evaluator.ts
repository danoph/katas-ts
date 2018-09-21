export class HandEvaluator {
    public dupes;

    constructor(public cards) {
        this.dupes = this.getDuplicates();
    }

    public evaluateHand() {
        
        if (this.dupes.length) {
            const hands = [
                new TwoOfAKind(this.cards).evaluate(),
                new TwoPair(this.cards).evaluate(),
                new ThreeOfAKind(this.cards).evaluate()
            ].filter(hand => hand);
            return this.getBestHand(hands);
        } else {
            return new HighCard(this.cards).evaluate().message;
        }
    }

    getBestHand(hands) {
        return hands.reduce((bestHand, hand) => {
            hand.weight > bestHand.weight ? hand : bestHand
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
        .reduce((acc, rank) => acc.concat(rankCounts[rank]), [])
    }
}

class HighCard extends HandEvaluator {
    weight: number;
    message: string;

    evaluate() {
        return {
            weight: 1,
            message: `High Card (${this.getHighRankCard(this.cards)} high)`
        }
    }
}

class TwoOfAKind extends HandEvaluator {
    rank: string;
    weight: number;

    evaluate() {
        if (this.dupes.length === 2) {
            return {
                weight: 2,
                message: `Two of a Kind (${this.getHighRankCard(this.dupes)} high)`
            }
        }
    }
}

class TwoPair extends HandEvaluator {
    rank: string;
    weight: number;

    evaluate() {
        if (this.dupes.length === 4) {
            return {
                weight: 3,
                message: `Two Pair (${this.getHighRankCard(this.dupes)} high)`
            }
        }
    }
}

class ThreeOfAKind extends HandEvaluator {
    rank: string;
    weight: number;

    evaluate() {
        if (this.dupes.length === 6) {
            return {
                weight: 4,
                message: `Three of a Kind (${this.getHighRankCard(this.dupes)} high)`
            }
        }
    }
}

