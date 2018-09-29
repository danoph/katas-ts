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
  ball1: string,
  ball2: string,
  ball3: string
};

type InterfaceFrames = Array<InterfaceFrame>;

class FrameValidator {
  error = new ErrorFactory();
  constructor(private frames: InterfaceFrames) {}

  validate() {
    this.validRolls();
    this.validSpares();
    this.validStrikes();
    this.validGameLength();
  }

  validRolls() {
    return this.frames.filter(frame => {
      console.log('frame.ball1 + frame.ball2 > 9 : ' , parseInt(frame.ball1) + parseInt(frame.ball2), ' > 9 ' , parseInt(frame.ball1) + parseInt(frame.ball2) > 9);
      if (parseInt(frame.ball1) + parseInt(frame.ball2) > 9 || parseInt(frame.ball2) + parseInt(frame.ball3) > 9) {
        this.error.throw(BOWLING_TOO_MANY_PINS);
      }
    })
  }
  
  validSpares() {
    return this.frames.filter(frame => {
      if ("" + frame.ball1 === '/') {
        this.error.throw(BOWLING_SPARE_TOO_EARLY);
      }
    });
  }

  validStrikes() {
    return this.frames.filter(frame => {
      if ("" + frame.ball2 === 'X') {
        this.error.throw(BOWLING_STRIKE_TOO_LATE);
      }
    });
  }

  validGameLength() {
    if (this.frames.length > 10) {
      this.error.throw(BOWLING_GAME_TOO_LONG);
    } else if (this.frames.length < 10) {
      this.error.throw(BOWLING_GAME_TOO_SHORT);
    }
  }
}

class ErrorFactory {
  errorMap = {
    'BOWLING_GAME_TOO_SHORT': 'Game too short - should not accept an invalid game',
    'BOWLING_GAME_TOO_LONG': 'Game too long - should not accept a game that is too long',
    'BOWLING_SPARE_TOO_EARLY': 'Spare too early - should not allow a spare at the start of a frame',
    'BOWLING_STRIKE_TOO_LATE': 'Strike too late - spares must occur at the end of a frame',
    'BOWLING_TOO_MANY_PINS': 'Too many pins - knocking down 10 pins requires a spare'
  };

  constructor() {}

  throw(error) {
    throw new Error(this.errorMap[error]);
  }
}

class FrameParser {
  constructor(private frameString) {}

  parse() {
    let framesArray = [];
    let frameArray = [];
    let frames = [];

    const framesSplit = this.frameString.split('');

    for (let frameIndex in framesSplit) {
      let index = parseInt(frameIndex);

      if (framesSplit[index] === 'X' && frameArray.length === 0) {
        framesArray.push(new Strike([framesSplit[index]]));
        frameArray = [];
      } else {
        frameArray.push(framesSplit[index]);
      }

      if (frameArray.length === 2 && framesArray.length < 9) {
        framesArray.push(new Frame(frameArray));
        frameArray = [];
      } else if (framesArray.length === 9) {
        const tenthFrame = framesSplit.slice(index, framesSplit.length);
        framesArray.push(new TenthFrame(tenthFrame));
        frameArray = [];
      }
    }

    for (let frame of framesArray) {
      frames.push(frame);
    }

    return frames;
  }

}

class Frame {
  type: string;
  ball1: string;
  ball2: string;
  constructor(public frame) {
    this.type = 'frame';
    this.ball1 = frame[0];
    this.ball2 = frame[1] ? frame[1] : null;
  }
}

class Strike extends Frame {
  constructor(public frame) {
    super(frame);
    this.type = 'strike';
    this.ball1 = this.frame[0];
  }
}

class Spare extends Frame {
  ball1: string;
  ball2: string;
}

class TenthFrame extends Frame {
  ball3: string;
  constructor(public frame) {
    super(frame);
    this.type = 'tenthFrame';
    this.ball1 = this.frame[0];
    this.ball2 = frame[1] ? frame[1] : null;
    this.ball3 = frame[2] ? frame[2] : null;
  }
}