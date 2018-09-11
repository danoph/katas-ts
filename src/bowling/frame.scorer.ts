import { IFrame } from './frame.builder';

export class FrameScorer {
  scoreFrames(frames: IFrame[]): number {
    let score = 0;

    for (let frame of frames) {
      score += frame.score;
    }

    return score;
  }
}
