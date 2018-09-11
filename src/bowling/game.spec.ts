import { Game, } from './game';

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
        expect(() => new Game(frames)).toThrowError(Error, "Spare too early - shoudl not allow a spare at the start of a frame");
      });
    });
  });
});

  //def test_not_enough_strikes_throws_an_exception
    //assert_raise(Bowling::GameTooShort, "Should not accept an invalid game") do
      //Bowling.new("X" * 10)
    //end    
  //end

  //def test_bad_spare_throws_an_exception
    //assert_raise(Bowling::SpareTooEarly, "Should not allow a spare at the start of a frame") do
      //Bowling.new("/" + "-" * 19)
    //end
  //end
  
  //def test_too_many_throws_throws_an_exception
    //assert_raise(Bowling::GameTooLong, "Should not accept a game that is too long") do
      //Bowling.new("4" * 21)
    //end
  //end
  
  //def test_knocking_down_10_pins_requires_a_spare
    //assert_raise(Bowling::TooManyPins, "Knocking down 10 pins requires a spare") do
      //Bowling.new("55" + "-" * 18)
    //end
  //end
  
  //def test_strikes_must_be_thrown_at_the_start_of_a_frame
    //assert_raise(Bowling::StrikeTooLate, "Spares must occur at the end of a frame") do
      //Bowling.new("-X" + "-" * 18)
    //end
  //end

  //######################
  //#                    #
  //# Tenth Frame Issues #
  //#                    #
  //######################
  
  //BAD_TENTH_FRAMES = {
    //'X4'  => Bowling::GameTooShort,
    //'444' => Bowling::GameTooLong,
    //'/44' => Bowling::SpareTooEarly,
    //'X/4' => Bowling::SpareTooEarly,
    //'4//' => Bowling::SpareTooEarly,
    //'X4X' => Bowling::StrikeTooLate,
    //'4X4' => Bowling::StrikeTooLate,
    //'99'  => Bowling::TooManyPins,
    //'X99' => Bowling::TooManyPins
  //}
  
  //def test_odd_tenth_frame_issues
    //BAD_TENTH_FRAMES.each do |frame, error|
      //assert_raise(error) { Bowling.new('-' * 18 + frame) }
    //end
  //end

  //GOOD_TENTH_FRAMES = %w( 44 9/9 4/X X44 X4/ XX4 XXX )
  
  //def test_valid_tenth_frame_issues
    //GOOD_TENTH_FRAMES.each do |frame|
      //assert_nothing_raised { Bowling.new('-' * 18 + frame) }
    //end
  //end

//end

