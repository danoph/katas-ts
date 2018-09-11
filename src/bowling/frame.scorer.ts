import { IFrame } from './frame.builder';

export class FrameScorer {
  scoreFrames(frames: IFrame[]): number {
    let score = 0;

    let nextFrameBaseScore;

    for (let frame of frames) {
      if (frame.score === 20) {
        if (nextFrameBaseScore) {
          nextFrameBaseScore += 20;
        } else {
          nextFrameBaseScore = 0;
        }
      } else {
        nextFrameBaseScore = 0;
      }

      score += frame.score + nextFrameBaseScore;
    }

    return score;
  }
}
