import {
  IThrow,
  GutterballThrow,
  StrikeThrow,
  SpareThrow,
  NormalThrow
} from './game';

interface IFrame {
  throws: IThrow[];
}

class Frame implements IFrame {
  constructor(public throws: IThrow[]) {}
}

export class FrameBuilder {
  buildFrames(throws: IThrow[]): IFrame[] {
    let frames: IFrame[] = [];

    let frameThrows = [];

    for (let _throw of throws) {
      switch (_throw.constructor) {
        case StrikeThrow:
          frames.push(new Frame([ _throw ]));
          frameThrows = [];
          break;
        default:
          frameThrows.push(_throw);
      }

      if (frameThrows.length === 2) {
        frames.push(new Frame(frameThrows));
        frameThrows = [];
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
