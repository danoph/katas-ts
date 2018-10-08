import { Bird } from './polymorphism';

fdescribe('Bird', () => {
  let bird;

  describe('#getSpeed', () => {
    describe('bird is EUROPEAN', () => {
      beforeEach(() => {
        bird = new Bird('EUROPEAN');
      });

      it('returns correct bird speed', () => {
        expect(bird.getSpeed()).toEqual(21);
      });
    });

    describe('bird is AFRICAN', () => {
      beforeEach(() => {
        bird = new Bird('AFRICAN');
      });

      it('returns correct bird speed', () => {
        expect(bird.getSpeed()).toEqual(15);
      });
    });

    describe('bird is NORWEGIAN BLUE', () => {
      describe('bird is nailed - not sure what this means', () => {
        beforeEach(() => {
          bird = new Bird('NORWEGIAN_BLUE', 3, true);
        });

        it('returns correct bird speed', () => {
          expect(bird.getSpeed()).toEqual(0);
        });
      });

      describe('bird is not nailed - not sure what this means', () => {
        beforeEach(() => {
          bird = new Bird('NORWEGIAN_BLUE', 3, false);
        });

        it('returns correct bird speed', () => {
          expect(bird.getSpeed()).toEqual(4);
        });
      });
    });
  });
});
