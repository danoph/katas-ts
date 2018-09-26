export const BOWLING_GAME_TOO_SHORT = 'BOWLING_GAME_TOO_SHORT';
export const BOWLING_GAME_TOO_LONG = 'BOWLING_GAME_TOO_LONG';
export const BOWLING_SPARE_TOO_EARLY = 'BOWLING_SPARE_TOO_EARLY';
export const BOWLING_STRIKE_TOO_LATE = 'BOWLING_STRIKE_TOO_LATE';
export const BOWLING_TOO_MANY_PINS = 'BOWLING_TOO_MANY_PINS';

export class Game {
  constructor(framesString: string) {
    const frames = new FrameParser(framesString).parse();
    const frameValidator = new FrameValidator(frames).validate();
  }

  score() {
    return 0;
  }
}

type InterfaceFrame = {
  ball1: number,
  ball2: number,
  ball3?: number
};

type InterfaceFrames = Array<InterfaceFrame>;

class FrameValidator {
  constructor(private frames: InterfaceFrames) {}

  validate() {
    this.validSpares();
    this.validStrikes();
    this.validGameLength();
  }

  validSpares() {
    return this.frames.filter(frame => {
      if ("" + frame.ball1 === '/') {
        throw new Error('Spare too early - should not allow a spare at the start of a frame');
      }
    });
  }

  validStrikes() {
    return this.frames.filter(frame => {
      if ("" + frame.ball2 === 'X') {
        throw new Error('Strike too late - spares must occur at the end of a frame');
      }
    });
  }

  validGameLength() {
    console.log('validGameLength: ' , this.frames);
    console.log('validGameLength.length: ' , this.frames.length);
    if (this.frames.length > 10) {
      throw new Error('Game too long - should not accept a game that is too long');
    } else if (this.frames.length < 10) {
      throw new Error('Game too short - should not accept an invalid game');
    }
  }
}

class FrameParser {
  constructor(private frameString) {}

  parse() {
    let framesArray = [];
    let frameArray = [];
    let frames = [];

    const framesSplit = this.frameString.split('');

    for (let roll of framesSplit) {
      if (roll === 'X' && frameArray.length === 0) {
        framesArray.push([roll])
        frameArray = [];
      } else {
        frameArray.push(roll);
      }

      if (frameArray.length === 2) {
        framesArray.push(frameArray);
        frameArray = [];
      }
    }

    for (let frame of framesArray) {
      frames.push(new Frame(frame));
    }

    return frames;
  }

}

class Frame {
  ball1: string;
  ball2?: string;
  ball3?: string;

  constructor(private frame: Array<string>) {
    this.ball1 = frame[0];
    this.ball2 = frame[1] ? frame[1] : '-';
    this.ball3 = frame[2] ? frame[2] : '-';
  }
}