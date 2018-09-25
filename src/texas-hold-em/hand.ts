export class Hand {
    weight: number;

    constructor(public cards) {
        
    }

    getDuplicates() {
        let rankCounts = {};

        for (let card of this.cards) {
        rankCounts[card.rank] = rankCounts[card.rank] || [];
        rankCounts[card.rank].push(card);
        }

        return Object.keys(rankCounts)
        .filter(rank => rankCounts[rank].length > 1)
        .map(rank => rankCounts[rank]);
    }

    getHighRankCard(cards) {
        return cards.reduce((highCard, card) =>
        card.rankValue > highCard.rankValue ? card : highCard,
        { rankValue: -1 }
        ).rank;
    }
}

export class HighCard extends Hand {
    weight = 9;

    evaluate() {
        return {
            weight: 9,
            message: `High Card (${this.getHighRankCard(this.cards)} high)`
        }
    }
}

export class TwoOfAKind extends Hand {
    weight = 8;

    evaluate() {
        const dupes = this.getDuplicates();
        if (dupes.length === 1 && dupes[0].length === 2) {
            return {
                weight: 8,
                message: `Two of a Kind (${this.getHighRankCard(dupes[0])} high)`
            }
        }
    }
}

export class TwoPair extends Hand {
    weight = 7;

    evaluate() {
        const dupes = this.getDuplicates();
        if (dupes.length === 2 && dupes[0].length === 2 && dupes[1].length === 2) {
            return {
                weight: 7,
                message: `Two Pair (${this.getHighRankCard([...dupes[0], ...dupes[1]])} high)`
            }
        }
    }
}

export class ThreeOfAKind extends Hand {
    weight = 6;

    evaluate() {
        const dupes = this.getDuplicates();
        if (dupes.length === 1 && dupes[0].length === 3) {
            return {
                weight: 6,
                message: `Three of a Kind (${this.getHighRankCard(dupes[0])} high)`
            }
        }
    }
}

export class FourOfAKind extends Hand {
    weight = 2;

    evaluate() {
        const dupes = this.getDuplicates();
        if (dupes.length === 1 && dupes[0].length === 4) {
            return {
                weight: 2,
                message: `Four of a Kind (${this.getHighRankCard(dupes[0])} high)`
            }
        }
    }
}

export class FullHouse extends Hand {
    weight = 3;

    evaluate() {
        const dupes = this.getDuplicates().sort((a, b) => b.length - a.length);
        if (dupes.length === 2 && dupes[0].length === 3 && dupes.length === 2) {
            return {
                weight: 3,
                message: `Full House (${this.getHighRankCard(dupes[0])} high)`
            }
        }
    }
}
  