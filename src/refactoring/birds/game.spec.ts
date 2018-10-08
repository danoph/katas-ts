import { Game } from './game';
import { Bird } from './bird';

fdescribe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('#greetBird', () => {
    let bird;

    describe('bird is EUROPEAN', () => {
      beforeEach(() => {
        bird = new Bird('EUROPEAN');
      });

      it('says hello to correct bird', () => {
        expect(game.greetBird(bird)).toEqual('Hello, European Bird');
      });
    });

    describe('bird is AFRICAN', () => {
      beforeEach(() => {
        bird = new Bird('AFRICAN');
      });

      it('says hello to correct bird', () => {
        expect(game.greetBird(bird)).toEqual('Hello, African Bird');
      });
    });

    describe('bird is Norwegian Blue', () => {
      beforeEach(() => {
        bird = new Bird('NORWEGIAN_BLUE');
      });

      it('says hello to correct bird', () => {
        expect(game.greetBird(bird)).toEqual('Hello, Norwegian Blue Bird');
      });
    });
  });
});
