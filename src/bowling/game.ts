export const BOWLING_GAME_TOO_SHORT = 'Game too short - should not accept an invalid game';
export const BOWLING_GAME_TOO_LONG = 'Game too long - should not accept a game that is too long';
export const BOWLING_SPARE_TOO_EARLY = 'Spare too early - should not allow a spare at the start of a frame';
export const BOWLING_STRIKE_TOO_LATE = 'Strike too late - spares must occur at the end of a frame';
export const BOWLING_TOO_MANY_PINS = 'Too many pins - knocking down 10 pins requires a spare';

export class Game {
  private frames: Frame[];

  constructor(framesString: string) {
    const frameParser = new FrameParser(framesString);
    this.frames = frameParser.parse();
    const tenthFrameValidator = new TenthFrameValidator(this.frames[9]);
    tenthFrameValidator.validate();
  }

  score() {
    const frameScorer = new FrameScorer(this.frames);
    return frameScorer.score();
  }
}

class FrameScorer {
  constructor(private frames: Frame[]) {}

  score() {
    let score = 0;

    for (let frame of this.frames) {
      score += frame.score();
    }

    return score;
  }
}

class Throw {
  constructor(private _throwString: string) {}

  isStrike() {
    return false;
  }

  isSpare() {
    return false;
  }

  value() {
    return +this._throwString;
  }
}

class Strike extends Throw {
  isStrike() {
    return true;
  }

  // need to remove this
  value() {
    return -1;
  }
}

class Spare extends Throw {
  isSpare() {
    return true;
  }

  // need to remove this
  value() {
    return -1;
  }
}

class GutterBall extends Throw {
  value() {
    return 0;
  }
}

class ThrowFactory {
  static build(throwString) {
    switch (throwString) {
      case 'X':
        return new Strike(throwString);
      case '/':
        return new Spare(throwString);
      case '-':
        return new GutterBall(throwString);  
      default: 
        return new Throw(throwString);
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

      if (ball.value() + this.score() === 10) {
        throw new Error(BOWLING_TOO_MANY_PINS);
      }
    }

    this.throws.push(ball);
  }

  score() {
    let score = 0;

    for (let ball of this.throws) {
      if (ball.isStrike()) {
        score += 10;
      } else if (ball.isSpare()) {
        score += 10 - this.firstThrow().value();
      } else {
        score += ball.value();
      }
    }

    return score;
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

  firstThrow() {
    return this.throws[0];
  }

  secondThrow() {
    return this.throws[1];
  }

  thirdThrow() {
    return this.throws[2];
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

    if (this.frame.firstThrow().isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }

    if (this.frame.firstThrow().isStrike() && this.frame.secondThrow().isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }

    if (this.frame.secondThrow().isSpare() && this.frame.thirdThrow().isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }
  }

}