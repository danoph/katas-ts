export class BowlingError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, BowlingError.prototype);
    this.name = this.constructor.name;
  }

  dump() {
    return { message: this.message, stack: this.stack }
  }
}

export class BowlingGameTooShort extends BowlingError { }
export class BowlingGameTooLong extends BowlingError {}
export class BowlingSpareTooEarly extends BowlingError {}
export class BowlingStrikeTooLate extends BowlingError {}
export class BowlingTooManyPins extends BowlingError {}

export class Game {
  constructor(private frames: string) {
    throw new Error("Game too short");
  }

  score() {
    return 0;
  }
}
