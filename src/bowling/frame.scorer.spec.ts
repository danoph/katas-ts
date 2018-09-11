import { FrameScorer } from './frame.scorer';

describe('FrameScorer', () => {
  let subject;

  beforeEach(() => {
    subject = new FrameScorer();
  });

  describe('#scoreFrames', () => {
    let frames;

    let frame1;
    let frame2;

    beforeEach(() => {
      frame1 = {
        score: 20
      }

      frame2 = {
        score: 10
      }

      frames = [
        frame1,
        frame2
      ]
    });

    it('returns score for frames', () => {
      expect(subject.scoreFrames(frames)).toEqual(30);
    });
  });
});
