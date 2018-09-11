export interface IThrow {
  score: number;
}

export class GutterballThrow implements IThrow {
  score = 0;
}

export class StrikeThrow implements IThrow {
  score = 10;
}

export class SpareThrow implements IThrow {
  score = 9;
}

export class NormalThrow implements IThrow {
  score: number;

  constructor(throwString: string) {
    this.score = parseInt(throwString);
  }
}

export interface IFrame {
  throws: IThrow[];
}

class Frame implements IFrame {
  throws: IThrow[] = [];

  addThrow(_throw: IThrow) {
    this.throws.push(_throw);
  }

  isFinished(): boolean {
    return this.throws.length === 2 || !!(this.throws.find(_throw => _throw.constructor === StrikeThrow));
  }
}

export class FrameBuilder {
  buildFrames(throws: IThrow[]): IFrame[] {
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
        return new GutterballThrow();
      case "X":
        return new StrikeThrow();
      case "/":
        return new SpareThrow();
      default:
        return new NormalThrow(throwString);
    }
  }
}

export class ThrowsFactory {
  static build(throwsString: string): IThrow[] {
    return throwsString.split("").map(throwString => ThrowFactory.build(throwString));
  }
}
