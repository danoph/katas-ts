export class Hand {
    weight: number;

    constructor(public cards) {
        
    }

    getRankDuplicates() {
        let rankCounts = {};

        for (let card of this.cards) {
        rankCounts[card.rank] = rankCounts[card.rank] || [];
        rankCounts[card.rank].push(card);
        }

        return Object.keys(rankCounts)
        .filter(rank => rankCounts[rank].length > 1)
        .map(rank => rankCounts[rank]);
    }

    getSuitDuplicates() {
        let suitCounts = {};

        for (let card of this.cards) {
            suitCounts[card.suit] = suitCounts[card.suit] || [];
            suitCounts[card.suit].push(card);
        }

        return Object.keys(suitCounts)
        .filter(suit => suitCounts[suit].length > 1)
        .map(suit => suitCounts[suit]);
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
        const dupes = this.getRankDuplicates();
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
        const dupes = this.getRankDuplicates();
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
        const dupes = this.getRankDuplicates();
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
        const dupes = this.getRankDuplicates();
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
        const dupes = this.getRankDuplicates().sort((a, b) => b.length - a.length);
        if (dupes.length === 2 && dupes[0].length === 3 && dupes.length === 2) {
            return {
                weight: 3,
                message: `Full House (${this.getHighRankCard(dupes[0])} high)`
            }
        }
    }
}

export class Straight extends Hand {
    weight = 5;

    sortCards(cards) {
        return cards.sort((a,b) => a.rankValue - b.rankValue);
    }

    evaluate() {
        const sortedCards = this.sortCards(this.cards);

        let straightCards = [sortedCards[0]];

        for (let cardIndex in sortedCards) {
            const index = parseInt(cardIndex);
            const card = sortedCards[index];

            if (sortedCards[index-1]) {
                if (card.rankValue === sortedCards[index-1].rankValue + 1) {
                    straightCards.push(card);
                    if (straightCards.length === 5) break;        
                } else {
                    straightCards = [ card ];
                }
            }
        }

        if (straightCards.length === 5) {
            return {
                weight: 5,
                message: `Straight (${this.getHighRankCard(straightCards)} high)`
            }
        }
        
    }
}

export class Flush extends Hand {
    weight = 4;

    evaluate() {
        const suits = this.getSuitDuplicates().sort((a,b) => b.length - a.length);

        if (suits[0].length >= 5) {
            return {
                weight: 4,
                message: `Flush (${this.getHighRankCard(suits[0])} high)`
            }
        }
    }
}