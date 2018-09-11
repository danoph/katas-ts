import {
  IFrame,
  FrameBuilder,
  ThrowsFactory
} from './frame.builder';
import { FrameScorer } from './frame.scorer';

export class Game {
  frames: IFrame[];

  constructor(
    throwsString: string,
    throwsFactory = ThrowsFactory,
    frameBuilder: FrameBuilder = new FrameBuilder(),
    private frameScorer: FrameScorer = new FrameScorer()
  ) {
    const throws = throwsFactory.build(throwsString);
    this.frames = frameBuilder.buildFrames(throws);
    //throw new Error(BOWLING_GAME_TOO_SHORT);
  }

  score() {
    return this.frameScorer.scoreFrames(this.frames);
    //return this.throws.reduce((score, curThrow) => score + curThrow.score, 0);
  }
}
