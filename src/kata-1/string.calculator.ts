export class StringCalculator {
  add(numberString: string): number {
    return numberString.split(',').reduce((sum, cur) => sum + +cur, 0);
  }
}
