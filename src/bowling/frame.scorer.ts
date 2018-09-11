import { IFrame } from './frame.builder';

export class FrameScorer {
  scoreFrames(frames: IFrame[]): number {
    let score = 0;

    let frameScore = 0;
    let previousFrame: any;

    for (let frameNumber in frames) {
      const frame = frames[frameNumber];

      if (parseInt(frameNumber) > 0) {
        previousFrame = frames[parseInt(frameNumber) - 1];
      }

      if (previousFrame && previousFrame.score === 20) {
        frameScore += 20;
      } else {
        frameScore = 0;
      }

      score += frame.score + frameScore;
    }

    return score;
  }
}
