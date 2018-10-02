export const BOWLING_GAME_TOO_SHORT = 'Game too short - should not accept an invalid game';
export const BOWLING_GAME_TOO_LONG = 'Game too long - should not accept a game that is too long';
export const BOWLING_SPARE_TOO_EARLY = 'Spare too early - should not allow a spare at the start of a frame';
export const BOWLING_STRIKE_TOO_LATE = 'Strike too late - spares must occur at the end of a frame';
export const BOWLING_TOO_MANY_PINS = 'Too many pins - knocking down 10 pins requires a spare';

export class Game {
  constructor(framesString: string) {
    const frameParser = new FrameParser(framesString);
    const frames = frameParser.parse();
    const tenthFrameValidator = new TenthFrameValidator(frames[9]);
    tenthFrameValidator.validate();
  }

  score() {
    return 0;
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

class GutterBall extends Throw {
  
}

class ThrowFactory {
  static build(throwString) {
    switch (throwString) {
      case 'X':
        return new Strike(10);
      case '/':
        return new Spare(10);
      case '-':
        return new GutterBall(0);  
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
    let currentFrame = new Frame();
    let frames = [ currentFrame ];

    for (let currentThrow of this.throws) {
      if (currentFrame.isFinished()) {
        currentFrame = frames.length === 9 ? new TenthFrame() : new Frame();
        frames.push(currentFrame);
      }

      currentFrame.addThrow(currentThrow); 
    }

    return frames;
  }
}

class Frame {
  type: string;
  throws: Throw[] = [];

  addThrow(ball: Throw) {
    if (this.throws.length === 0) {
      if (ball.isSpare()) {
        throw new Error(BOWLING_SPARE_TOO_EARLY);
      }
    } else if (this.throws.length === 1) {
      if (ball.isStrike()) {
        throw new Error(BOWLING_STRIKE_TOO_LATE);
      }

      if (ball.value + this.score() === 10) {
        throw new Error(BOWLING_TOO_MANY_PINS);
      }
    }

    this.throws.push(ball);
  }

  score() {
    return this.throws.reduce((sum, cur) => sum + cur.value, 0);
  }

  isFinished() {
    return this.throws.length === 2 || this.strikeThrown();
  }

  strikeThrown() {
    return !!this.throws.find(ball => ball.isStrike());
  }

  spareThrown() {
    return !!this.throws.find(ball => ball.isSpare());
  }

  strikeOrSpareThrown() {
    return this.strikeThrown() || this.spareThrown();
  }

  numberOfThrows() {
    return this.throws.length;
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
        throw new Error(BOWLING_GAME_TOO_LONG);
      }
    }
  }
}

class TenthFrameValidator {
  constructor(private frame: TenthFrame) {}

  validate() {
    if (this.frame.strikeOrSpareThrown() && this.frame.numberOfThrows() !== 3) {
      throw new Error(BOWLING_GAME_TOO_SHORT);
    }


  }

}