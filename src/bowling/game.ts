export const BOWLING_GAME_TOO_SHORT = 'BOWLING_GAME_TOO_SHORT';
export const BOWLING_GAME_TOO_LONG = 'BOWLING_GAME_TOO_LONG';
export const BOWLING_SPARE_TOO_EARLY = 'BOWLING_SPARE_TOO_EARLY';
export const BOWLING_STRIKE_TOO_LATE = 'BOWLING_STRIKE_TOO_LATE';
export const BOWLING_TOO_MANY_PINS = 'BOWLING_TOO_MANY_PINS';

export class Game {
  constructor(framesString: string) {
    const frames = new FrameParser(framesString).parse();
    // const frameValidator = new FrameValidator(frames).validate();
  }

  score() {
    return 0;
  }
}

// type InterfaceFrame = {
//   ball1: string,
//   ball2: string,
//   ball3: string
// };

// type InterfaceFrames = Array<InterfaceFrame>;

// class FrameValidator {
//   error = new ErrorFactory();
//   constructor(private frames: InterfaceFrames) {}

//   validate() {
//     this.validRolls();
//     this.validSpares();
//     this.validStrikes();
//     this.validGameLength();
//   }

//   validRolls() {
//     return this.frames.filter(frame => {
//       //console.log('frame.ball1 + frame.ball2 > 9 : ' , parseInt(frame.ball1) + parseInt(frame.ball2), ' > 9 ' , parseInt(frame.ball1) + parseInt(frame.ball2) > 9);
//       if (parseInt(frame.ball1) + parseInt(frame.ball2) > 9 || parseInt(frame.ball2) + parseInt(frame.ball3) > 9) {
//         this.error.throw(BOWLING_TOO_MANY_PINS);
//       }
//     })
//   }
  
//   validSpares() {
//     return this.frames.filter(frame => {
//       if ("" + frame.ball1 === '/') {
//         this.error.throw(BOWLING_SPARE_TOO_EARLY);
//       }
//     });
//   }

//   validStrikes() {
//     return this.frames.filter(frame => {
//       if ("" + frame.ball2 === 'X') {
//         this.error.throw(BOWLING_STRIKE_TOO_LATE);
//       }
//     });
//   }

//   validGameLength() {
//     if (this.frames.length > 10) {
//       this.error.throw(BOWLING_GAME_TOO_LONG);
//     } else if (this.frames.length < 10) {
//       this.error.throw(BOWLING_GAME_TOO_SHORT);
//     }
//   }
// }

class ErrorFactory {
  static ERROR_MAP = {
    'BOWLING_GAME_TOO_SHORT': 'Game too short - should not accept an invalid game',
    'BOWLING_GAME_TOO_LONG': 'Game too long - should not accept a game that is too long',
    'BOWLING_SPARE_TOO_EARLY': 'Spare too early - should not allow a spare at the start of a frame',
    'BOWLING_STRIKE_TOO_LATE': 'Strike too late - spares must occur at the end of a frame',
    'BOWLING_TOO_MANY_PINS': 'Too many pins - knocking down 10 pins requires a spare'
  };

  constructor() {}

  throw(errorKey) {
    throw new Error(ErrorFactory.ERROR_MAP[errorKey]);
  }
}

class Throw {
  constructor(public value: number) {}

  isStrike() {
    return false;
  }

  isSpare() {
    return false;
  }
}

class Strike extends Throw {
  isStrike() {
    return true;
  }
}

class Spare extends Throw {
  isSpare() {
    return true;
  }
}

class ThrowFactory {
  static build(throwString) {
    switch (throwString) {
      case 'X':
        return new Strike(10);
      case '/':
        return new Spare(10);
      default: 
        return new Throw(parseInt(throwString));
    }
  }
}

class FrameParser {
  throws: Throw[];

  constructor(frameString) {
    this.throws = frameString.split('')
      .map(throwString => ThrowFactory.build(throwString));
  }

  parse() {
    let frames = [];
    let currentFrame = new Frame();

    for (let currentThrow of this.throws) {
      currentFrame.addThrow(currentThrow);

      if (currentFrame.isFinished()) {
        frames.push(currentFrame);
        currentFrame = frames.length === 9 ? new TenthFrame() : new Frame();
      }
    }

    return frames;
  }
}

class Frame {
  type: string;
  throws: Throw[] = [];

  addThrow(ball: Throw) {
    if (ball.isSpare() && this.throws.length === 0) {
      throw new Error(ErrorFactory.ERROR_MAP[BOWLING_SPARE_TOO_EARLY]);
    }

    if (this.throws.length === 1 && ball.value + this.throws[0].value === 10) {
      throw new Error(ErrorFactory.ERROR_MAP[BOWLING_TOO_MANY_PINS]);
    }

    if (this.throws.length === 1 && ball.isStrike()) {
      throw new Error(ErrorFactory.ERROR_MAP[BOWLING_STRIKE_TOO_LATE]);
    }

    this.throws.push(ball);
  }

  score() {
    return this.throws.reduce((sum, cur) => sum + cur.value, 0);
  }

  isFinished() {
    return this.throws.length === 2 || this.throws[0].isStrike();
  }

  strikeOrSpareThrown() {
    return !!this.throws.find(ball => ball.isStrike() || ball.isSpare());
  }
}

class TenthFrame extends Frame {
  isFinished() {
    return this.throws.length === 3;
  }

  addThrow(ball: Throw) {

    if (this.throws.length < 2) {
      this.throws.push(ball);
    } else { 
      if (this.strikeOrSpareThrown()) {
        this.throws.push(ball);
      } else {
        throw new Error(ErrorFactory.ERROR_MAP[BOWLING_GAME_TOO_LONG]);
      }
    }
  }
}