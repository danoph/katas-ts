export const BOWLING_GAME_TOO_SHORT = 'BOWLING_GAME_TOO_SHORT';
export const BOWLING_GAME_TOO_LONG = 'BOWLING_GAME_TOO_LONG';
export const BOWLING_SPARE_TOO_EARLY = 'BOWLING_SPARE_TOO_EARLY';
export const BOWLING_STRIKE_TOO_LATE = 'BOWLING_STRIKE_TOO_LATE';
export const BOWLING_TOO_MANY_PINS = 'BOWLING_TOO_MANY_PINS';

interface IThrow {
  score: number;
}

class GutterballThrow implements IThrow {
  score = 0;
}

//type Throw = GutterballThrow;

class ThrowFactory {
  static build(_throw) {
    switch (_throw) {
      case "-":
        return new GutterballThrow();
    }
  }
}

export class Game {
  throws: IThrow[];

  constructor(framesString: string) {
    this.throws = framesString.split("").map(_throw => ThrowFactory.build(_throw));
    //throw new Error(BOWLING_GAME_TOO_SHORT);
  }

  score() {
    return this.throws.reduce((score, curThrow) => score + curThrow.score, 0);
  }
}
