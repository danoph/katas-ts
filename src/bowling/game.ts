export const BOWLING_GAME_TOO_SHORT = 'Game too short - should not accept an invalid game';
export const BOWLING_GAME_TOO_LONG = 'Game too long - should not accept a game that is too long';
export const BOWLING_SPARE_TOO_EARLY = 'Spare too early - should not allow a spare at the start of a frame';
export const BOWLING_STRIKE_TOO_LATE = 'Strike too late - spares must occur at the end of a frame';
export const BOWLING_TOO_MANY_PINS = 'Too many pins - knocking down 10 pins requires a spare';

export class Game {
  private frames: Frame[];

  constructor(framesString: string) {
    const frameParser = new FrameParser();
    this.frames = frameParser.parse(framesString);

    for (let frame of this.frames) {
      frame.validate();
    }
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

    for (let index in this.frames) {
      const frame = this.frames[+index];
      const nextFrame = this.frames[+index+1];
      const nextNextFrame = this.frames[+index+2];

      score += frame.score();

      if (frame.spareThrown()) {
        if (!frame.isTenthFrame()) {
          score += nextFrame.firstThrowValue();
        }
      }

      if (frame.strikeThrown()) {
        if (!frame.isTenthFrame()) {
          score += nextFrame.firstThrowValue();

          if (nextFrame.strikeThrown()) {
            if (nextNextFrame) {
              score += nextNextFrame.firstThrowValue();
            } else {
              score += nextFrame.secondThrowValue();
            }
          } else {
            score += nextFrame.secondThrowValue();
          }
        }
      }
    }

    return score;
  }
}

class Throw {
  constructor(private _value: number) {}

  isStrike() {
    return false;
  }

  isSpare() {
    return false;
  }

  value() {
    return this._value;
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

class GutterBall extends Throw {}

class FrameParser {
  parse(frameString: string) {
    const throws = frameString.split("");
    let currentFrame = new Frame();
    let frames = [ currentFrame ];

    for (let throwString of throws) {
      if (currentFrame.isFinished()) {
        currentFrame = frames.length === 9 ? new TenthFrame() : new Frame();
        frames.push(currentFrame);
      }

      let currentThrow;

      if (throwString === 'X') {
        currentThrow = new Strike(10);
      } else if (throwString === '/') {
        const spareValue = currentFrame.firstThrow() ? 10 - currentFrame.firstThrow().value() : 0;
        currentThrow = new Spare(spareValue);
      } else if (throwString === '-') {
        currentThrow = new GutterBall(0);  
      } else {
        currentThrow = new Throw(+throwString);
      }

      currentFrame.addThrow(currentThrow); 
    }

    return frames;
  }
}

class Frame {
  type: string;
  throws: Throw[] = [];

  validate() {
    new FrameValidator().validate(this);
  }

  addThrow(ball: Throw) {
    this.throws.push(ball);
  }

  score() {
    return this.throws.reduce((sum, ball) => sum + ball.value(), 0);
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

  isTenthFrame() {
    return false;
  }

  firstThrowValue() {
    return this.firstThrow().value();
  }

  secondThrowValue() {
    return this.secondThrow().value();
  }
}

class TenthFrame extends Frame {
  validate() {
    new TenthFrameValidator().validate(this);
  }

  isFinished() {
    return this.throws.length === 3;
  }

  isTenthFrame() {
    return true;
  }

  addThrow(ball: Throw) {
    this.throws.push(ball);
  }
}

class TenthFrameValidator {
  validate(frame: TenthFrame) {
    if (frame.strikeOrSpareThrown() && frame.numberOfThrows() !== 3) {
      throw new Error(BOWLING_GAME_TOO_SHORT);
    }

    if (!frame.strikeOrSpareThrown() && frame.numberOfThrows() === 3) {
      throw new Error(BOWLING_GAME_TOO_LONG);
    }

    if (frame.firstThrow().isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }

    if (frame.firstThrow().isStrike() && frame.secondThrow().isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }

    if (frame.secondThrow().isSpare() && frame.thirdThrow().isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }
  }
}

class FrameValidator {
  validate(frame: Frame) {
    if (frame.firstThrow().isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }

    if (frame.secondThrow()) {
      if (frame.secondThrow().isStrike()) {
        throw new Error(BOWLING_STRIKE_TOO_LATE);
      }

      if (frame.firstThrowValue() + frame.secondThrowValue() === 10 && !frame.secondThrow().isSpare()) {
        throw new Error(BOWLING_TOO_MANY_PINS);
      }
    }
  }
}