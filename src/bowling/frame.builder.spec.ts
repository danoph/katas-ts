import {
  GutterballThrow,
  StrikeThrow,
  SpareThrow,
  NormalThrow
} from './frame.builder';
import { FrameBuilder } from './frame.builder';
import { ThrowsFactory } from './frame.builder';

describe('FrameBuilder', () => {
  let subject;
  let throws;

  describe('#buildFrames', () => {
    beforeEach(() => {
      subject = new FrameBuilder();
    });

    describe('valid frames', () => {
      let throw1, throw2, throw3, throw4, throw5, throw6, throw7, throw8, throw9, throw10, throw11, throw12, throw13, throw14, throw15, throw16, throw17;

      beforeEach(() => {
        throw1 = new StrikeThrow('X');
        throw2 = new NormalThrow('7');
        throw3 = new SpareThrow('/');
        throw4 = new NormalThrow('7');
        throw5 = new NormalThrow('2');
        throw6 = new NormalThrow('9');
        throw7 = new SpareThrow('/');
        throw8 = new StrikeThrow('X');
        throw9 = new StrikeThrow('X');
        throw10 = new StrikeThrow('X');
        throw11 = new NormalThrow('2');
        throw12 = new NormalThrow('3');
        throw13 = new NormalThrow('6');
        throw14 = new SpareThrow('/');
        throw15 = new NormalThrow('7');
        throw16 = new SpareThrow('/');
        throw17 = new NormalThrow('3');

        throws = [ throw1, throw2, throw3, throw4, throw5, throw6, throw7, throw8, throw9, throw10, throw11, throw12, throw13, throw14, throw15, throw16, throw17 ]
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

    describe('spare at beginning of frame', () => {
      beforeEach(() => {
        throws = [
          new NormalThrow('1'),
          new NormalThrow('1'),
          new SpareThrow('/'),
        ]
      });

      it('throws an exception', () => {
        expect(() => subject.buildFrames(throws)).toThrowError(Error, "Spare too early - should not allow a spare at the start of a frame");
      });
    });

    describe('throwing a 10 requires spare', () => {
      beforeEach(() => {
        throws = [
          new NormalThrow('3'),
          new NormalThrow('7'),
        ]
      });

      it('throws an exception', () => {
        expect(() => subject.buildFrames(throws)).toThrowError(Error, "Too many pins - knocking down 10 pins requires a spare");
      });
    });

    //describe('throwing strike on second throw', () => {
      //beforeEach(() => {
        //throws = [
          //new NormalThrow('3'),
          //new NormalThrow('X'),
        //]
      //});

      //it('throws an exception', () => {
        //expect(() => subject.buildFrames(throws)).toThrowError(Error, "Strike too late - spares must occur at the end of a frame");
      //});
    //});
  });

    //describe('strikes must be thrown at the start of a frame', () => {
      //beforeEach(() => {
        //frames = "-X" + "-".repeat(18);
      //});

      //it('throws an exception', () => {
        //expect(() => new Game(frames)).toThrowError(Error, "Strike too late - spares must occur at the end of a frame");
      //});
    //});

    //describe('not enough strikes', () => {
      //beforeEach(() => {
        //frames = "X".repeat(10);
      //});

      //it('throws an exception', () => {
        //expect(() => new Game(frames)).toThrowError(Error, "Game too short - should not accept an invalid game");
      //});
    //});

    //describe('too many throws throws an exception', () => {
      //beforeEach(() => {
        //frames = "4".repeat(21);
      //});

      //it('throws an exception', () => {
        //expect(() => new Game(frames)).toThrowError(Error, "Game too long - should not accept a game that is too long");
      //});
    //});
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
