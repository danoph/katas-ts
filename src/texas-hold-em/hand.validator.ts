export class HandValidator {
    constructor(private cards) {}
  
    validate() {
      this.tooManyCards();
      this.tooFewCards();
      this.duplicateCards();
    }
  
    tooManyCards() {
      if (this.cards.length > 7) {
        throw new Error('Too many cards');
      }
    }
  
    tooFewCards() {
      if (this.cards.length < 7) {
        throw new Error('Too few cards');
      }
    }
  
    duplicateCards() {
      const duplicates = this.cards
        .filter(card => this.cards
          .find(card2 => card !== card2 && card2.rank === card.rank && card2.suit === card.suit)
        )
  
      if (duplicates.length) {
        throw new Error('Duplicate cards');
      }
    }
  }