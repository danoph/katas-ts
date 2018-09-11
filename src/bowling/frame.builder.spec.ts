import {
  GutterballThrow,
  StrikeThrow,
  SpareThrow,
  NormalThrow
} from './game';
import { FrameBuilder } from './frame.builder';
import { ThrowsFactory } from './frame.builder';

describe('FrameBuilder', () => {
  let subject;
  let throws;

  let throw1;
  let throw2;
  let throw3;
  let throw4;
  let throw5;
  let throw6;
  let throw7;
  let throw8;
  let throw9;
  let throw10;
  let throw11;
  let throw12;
  let throw13;
  let throw14;
  let throw15;
  let throw16;
  let throw17;

  describe('#buildFrames', () => {
    beforeEach(() => {
      throw1 = new StrikeThrow();
      throw2 = new NormalThrow('7');
      throw3 = new SpareThrow();
      throw4 = new NormalThrow('7');
      throw5 = new NormalThrow('2');
      throw6 = new NormalThrow('9');
      throw7 = new SpareThrow();
      throw8 = new StrikeThrow();
      throw9 = new StrikeThrow();
      throw10 = new StrikeThrow();
      throw11 = new NormalThrow('2');
      throw12 = new NormalThrow('3');
      throw13 = new NormalThrow('6');
      throw14 = new SpareThrow();
      throw15 = new NormalThrow('7');
      throw16 = new SpareThrow();
      throw17 = new NormalThrow('3');

      throws = [
        throw1,
        throw2,
        throw3,
        throw4,
        throw5,
        throw6,
        throw7,
        throw8,
        throw9,
        throw10,
        throw11,
        throw12,
        throw13,
        throw14,
        throw15,
        throw16,
        throw17,
      ]

      subject = new FrameBuilder();
    });

    it('returns correct frames', () => {
      const frames = subject.buildFrames(throws);

      //const throwsString = "X7/729/XXX236/7/3";

      // X
      expect(frames[0].throws[0]).toEqual(throw1);
      expect(frames[0].throws.length).toEqual(1);

      // 7/
      expect(frames[1].throws[0]).toEqual(throw2);
      expect(frames[1].throws[1]).toEqual(throw3);
      expect(frames[1].throws.length).toEqual(2);

      // 72
      expect(frames[2].throws[0]).toEqual(throw4);
      expect(frames[2].throws[1]).toEqual(throw5);
      expect(frames[2].throws.length).toEqual(2);

      // 9/
      expect(frames[3].throws[0]).toEqual(throw6);
      expect(frames[3].throws[1]).toEqual(throw7);
      expect(frames[3].throws.length).toEqual(2);

      // X
      expect(frames[4].throws[0]).toEqual(throw8);
      expect(frames[4].throws.length).toEqual(1);

      // X
      expect(frames[5].throws[0]).toEqual(throw9);
      expect(frames[5].throws.length).toEqual(1);

      // X
      expect(frames[6].throws[0]).toEqual(throw10);
      expect(frames[6].throws.length).toEqual(1);

      expect(frames.length).toEqual(10);
    });
  });
});

describe('ThrowsBuilder', () => {
  let subject;

  describe('#build', () => {
    let throwsString;

    beforeEach(() => {
      throwsString = "X7/729/-XXX236/7/3";
    });

    it('returns correct throws', () => {
      const throws = ThrowsFactory.build(throwsString);

      expect(throws[0]).toEqual(jasmine.any(StrikeThrow));
      expect(throws[0].score).toEqual(10);

      expect(throws[1]).toEqual(jasmine.any(NormalThrow));
      expect(throws[1].score).toEqual(7);

      expect(throws[2]).toEqual(jasmine.any(SpareThrow));
      expect(throws[2].score).toEqual(9);

      expect(throws[3]).toEqual(jasmine.any(NormalThrow));
      expect(throws[3].score).toEqual(7);

      expect(throws[4]).toEqual(jasmine.any(NormalThrow));
      expect(throws[4].score).toEqual(2);

      expect(throws[5]).toEqual(jasmine.any(NormalThrow));
      expect(throws[5].score).toEqual(9);

      expect(throws[6]).toEqual(jasmine.any(SpareThrow));
      expect(throws[6].score).toEqual(9);

      expect(throws[7]).toEqual(jasmine.any(GutterballThrow));
      expect(throws[7].score).toEqual(0);
    });
  });
});
