import { StringCalculator } from './string.calculator';

fdescribe('String Calculator', () => {
  let subject;

  beforeEach(() => {
    subject = new StringCalculator();
  });

  describe('#add', () => {
    it('can add ""', () => {
      expect(subject.add('')).toEqual(0);
    });

    it('can add 1,2', () => {
      expect(subject.add('1,2')).toEqual(3);
    });

    it('can add "1\n2,3"', () => {
      expect(subject.add("1\n2,3")).toEqual(6);
    });

    it('can add "1,\n"', () => {
      //expect(() => subject.add("1,\n")).toThrowError(Error, 'Invalid number');
      expect(subject.add("1,\n")).toEqual(1);
    });
  });
});
