import { BOWLING_SPARE_TOO_EARLY } from './errors';

export interface IThrow {
  score: number;

  isStrike: () => boolean;
  isSpare: () => boolean;
}

export class Throw implements IThrow {
  score = 0;

  constructor(throwString: string) {}

  isStrike() { return false }
  isSpare() { return false }
}

export class GutterballThrow extends Throw {
  score = 0;
}

export class StrikeThrow extends Throw {
  score = 10;

  isStrike() { return true }
}

export class SpareThrow extends Throw {
  score = 9;

  isSpare() { return true }
}

export class NormalThrow extends Throw {
  score: number;

  constructor(throwString: string) {
    super(throwString);
    this.score = parseInt(throwString);
  }
}

export interface IFrame {
  throws: IThrow[];
}

class Frame implements IFrame {
  throws: IThrow[] = [];

  addThrow(_throw: Throw) {
    this._validateThrow(_throw);
    this.throws.push(_throw);
  }

  isFinished(): boolean {
    return this.throws.length === 2 || !!(this.throws.find(_throw => _throw.isStrike()));
  }

  private _validateThrow(_throw: Throw): void {
    if (this.throws.length === 0 && _throw.isSpare()) {
      throw new Error(BOWLING_SPARE_TOO_EARLY);
    }
  }
}

export class FrameBuilder {
  buildFrames(throws: Throw[]): IFrame[] {
    let frames: IFrame[] = [];

    let currentFrame = new Frame();

    for (let _throw of throws) {
      currentFrame.addThrow(_throw);

      if (currentFrame.isFinished()) {
        frames.push(currentFrame);
        currentFrame = new Frame();
      }
    }

    return frames;
  }
}


class ThrowFactory {
  static build(throwString) {
    switch (throwString) {
      case "-":
        return new GutterballThrow(throwString);
      case "X":
        return new StrikeThrow(throwString);
      case "/":
        return new SpareThrow(throwString);
      default:
        return new NormalThrow(throwString);
    }
  }
}

export class ThrowsFactory {
  static build(throwsString: string): Throw[] {
    return throwsString.split("").map(throwString => ThrowFactory.build(throwString));
  }
}
