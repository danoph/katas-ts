import {
  GutterballThrow,
  StrikeThrow,
  SpareThrow,
  NormalThrow
} from './game';
//import { FrameBuilder } from './frame.builder';
import { ThrowsFactory } from './frame.builder';

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

//describe('FrameBuilder', () => {
  //let subject;
  //let throws;

  //let throw1;
  //let throw2;
  //let throw3;
  //let throw4;
  //let throw5;
  //let throw6;
  //let throw7;
  //let throw8;
  //let throw9;

  //describe('#buildFrames', () => {
    ////frames = "X7/729/XXX236/7/3";

    //beforeEach(() => {
      //throw1 = new StrikeThrow();
      //throw2 = new NormalThrow('7');
      //throw3 = new SpareThrow();
      //throw4 = new NormalThrow('7');
      //throw2 = new NormalThrow('2');
      //throw5 = new NormalThrow('9');
      //throw5 = new SpareThrow();
      //throw6 = new StrikeThrow();
      //throw7 = new StrikeThrow();
      //throw8 = new StrikeThrow();
      //throw9 = new NormalThrow('2');
      //throw10 = new NormalThrow('3');
      //throw11 = new NormalThrow('6');

      //throws = [
        //throw1,
        //throw2,
        //throw3,
      //]

      //subject = new FrameBuilder(throws);
    //});

    //it('returns correct frames', () => {
      //const frames = subject.buildFrames();

      //expect(frames[0].throws[0]).toEqual(throw1);
      //expect(frames[0].throws[1]).toEqual(throw2);
    //});
  //});
//});
