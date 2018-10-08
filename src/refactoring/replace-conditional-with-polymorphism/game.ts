import { Bird } from './bird';

export class Game {
  constructor() {}

  greetBird(bird: Bird): string {
    switch (bird.getType()) {
      case 'EUROPEAN':
        return 'Hello, European Bird';
      case 'AFRICAN':
        return 'Hello, African Bird';
      case 'NORWEGIAN_BLUE':
        return 'Hello, Norwegian Blue Bird';
    }

    throw new Error("Invalid Bird Type");
  }
}
