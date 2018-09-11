export const BOWLING_GAME_TOO_SHORT = 'BOWLING_GAME_TOO_SHORT';
export const BOWLING_GAME_TOO_LONG = 'BOWLING_GAME_TOO_LONG';
export const BOWLING_SPARE_TOO_EARLY = "Spare too early - should not allow a spare at the start of a frame";
export const BOWLING_STRIKE_TOO_LATE = 'BOWLING_STRIKE_TOO_LATE';
export const BOWLING_TOO_MANY_PINS = 'BOWLING_TOO_MANY_PINS';

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

//export class BowlingGameTooShort extends BowlingError {}
export class BowlingGameTooLong extends BowlingError {}
export class BowlingSpareTooEarly extends BowlingError {}
export class BowlingStrikeTooLate extends BowlingError {}
export class BowlingTooManyPins extends BowlingError {}

export class BowlingGameTooShort extends Error {
  //name: string;
  //message: string;
  //stack: any;

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, BowlingGameTooShort.prototype);
    //Object.setPrototypeOf(this, this.constructor.name);
    this.message = message;
    //this.constructor.prototype = Error;
    //this.constructor = Error;
    this.stack = (new Error()).stack;
  }
}

