export class HandEvaluator {
    constructor(private cards) {}
  
    evaluate() {
      const dupes = this.getDuplicates();
      
      if (dupes.length === 2) {
        return `Two of a Kind (${this.getHighRankCard(dupes)} high)`;
      } else if (dupes.length === 4) {
        return `Two Pair (${this.getHighRankCard(dupes)} high)`;
      } else {
        return `High Card (${this.getHighRankCard(this.cards)} high)`;
      }
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