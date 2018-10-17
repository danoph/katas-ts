class NumberParser {
  constructor(private numberString: string) {}

  numbers() {
    return this.numberString
      .split(',')
      .map(numberString => +numberString)
  }
}

export class StringCalculator {
  add(numberString: string): number {
    const numberParser = new NumberParser(numberString);
    const numbers = numberParser.numbers();

    return numbers
      .reduce((sum, cur) => sum + cur, 0);
  }
}
