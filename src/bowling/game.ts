export const BOWLING_GAME_TOO_SHORT = "Game too short - should not accept an invalid game";
export const BOWLING_GAME_TOO_LONG = "Game too long - should not accept a game that is too long";
export const BOWLING_SPARE_TOO_EARLY = "Spare too early - should not allow a spare at the start of a frame";
export const BOWLING_STRIKE_TOO_LATE = "Strike too late - spares must occur at the end of a frame";
export const BOWLING_TOO_MANY_PINS = "Too many pins - knocking down 10 pins requires a spare";

export class Game {
  constructor(framesString: string) {}

  score() {
    return 0;
  }
}
