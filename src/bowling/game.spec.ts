import {
  Game,
  BOWLING_GAME_TOO_SHORT,
  BOWLING_GAME_TOO_LONG,
  BOWLING_SPARE_TOO_EARLY,
  BOWLING_STRIKE_TOO_LATE,
  BOWLING_TOO_MANY_PINS,
} from './game';

describe('Game', () => {
  let game;
  let frames;

  describe('#score', () => {
    describe('gutterball game', () => {
      beforeEach(() => {
        frames = "-".repeat(20);
        game = new Game(frames);
      });

      it('is worth 0', () => {
        expect(game.score()).toEqual(0);
      });
    });

    describe('perfect game', () => {
      beforeEach(() => {
        frames = "X".repeat(12);
        game = new Game(frames);
      });

      it('is worth 300', () => {
        expect(game.score()).toEqual(300);
      });
    });

    describe('no spares', () => {
      beforeEach(() => {
        frames = "9-".repeat(10);
        game = new Game(frames);
      });

      it('is worth 90', () => {
        expect(game.score()).toEqual(90);
      });
    });

    describe('all spares', () => {
      beforeEach(() => {
        frames = "9/".repeat(10) + '9';
        game = new Game(frames);
      });

      it('is worth up to 190', () => {
        expect(game.score()).toEqual(190);
      });
    });

    describe('sample game', () => {
      beforeEach(() => {
        frames = "X7/729/XXX236/7/3";
        game = new Game(frames);
      });

      it('is worth 168', () => {
        expect(game.score()).toEqual(168);
      });
    });

    describe('not enough strikes', () => {
      beforeEach(() => {
        frames = "X".repeat(10);
      });

      it('throws an exception', () => {
        expect(() => new Game(frames)).toThrowError(Error, "Game too short - should not accept an invalid game");
      });
    });

    describe('bad spare', () => {
      beforeEach(() => {
        frames = "/" + "-".repeat(19);
      });

      it('throws an exception', () => {
        expect(() => new Game(frames)).toThrowError(Error, "Spare too early - should not allow a spare at the start of a frame");
      });
    });

    describe('too many throws throws an exception', () => {
      beforeEach(() => {
        frames = "4".repeat(21);
      });

      it('throws an exception', () => {
        expect(() => new Game(frames)).toThrowError(Error, "Game too long - should not accept a game that is too long");
      });
    });

    describe('knocking down 10 pins requires a spare', () => {
      beforeEach(() => {
        frames = "55" + "-".repeat(18);
      });

      it('throws an exception', () => {
        expect(() => new Game(frames)).toThrowError(Error, "Too many pins - knocking down 10 pins requires a spare");
      });
    });

    describe('strikes must be thrown at the start of a frame', () => {
      beforeEach(() => {
        frames = "-X" + "-".repeat(18);
      });

      it('throws an exception', () => {
        expect(() => new Game(frames)).toThrowError(Error, "Strike too late - spares must occur at the end of a frame");
      });
    });

    describe('tenth frame issues', () => {
      let badTenthFrames;

      beforeEach(() => {
        badTenthFrames = {
          'X4': BOWLING_GAME_TOO_SHORT,
          '444': BOWLING_GAME_TOO_LONG,
          '/44': BOWLING_SPARE_TOO_EARLY,
          'X/4': BOWLING_SPARE_TOO_EARLY,
          '4//': BOWLING_SPARE_TOO_EARLY,
          'X4X': BOWLING_STRIKE_TOO_LATE,
          '4X4': BOWLING_STRIKE_TOO_LATE,
          '99': BOWLING_TOO_MANY_PINS,
          'X99': BOWLING_TOO_MANY_PINS
        }
      });

      it('throws an exception', () => {
        for (let frame of badTenthFrames) {
          frames = "-".repeat(18) + frame;
          const expectedError = badTenthFrames[frame];
          expect(() => new Game(frames)).toThrowError(Error, expectedError);
        }
      });
    });

    describe('valid tenth frame issues', () => {
      let goodTenthFrames;

      beforeEach(() => {
        goodTenthFrames = [
          "44",
          "9/9",
          "4/X",
          "X44",
          "X4/",
          "XX4",
          "XXX"
        ]
      });

      it('does not throw error', () => {
        for (let frame of goodTenthFrames) {
          frames = "-".repeat(18) + frame;
          expect(() => new Game(frames)).not.toThrow();
        }
      });
    });
  });
});
