class NumberParser {
  constructor(private numberString: string) {}

  numbers() {
    return this.numberString
      .split("\n")
      .join(",")
      .split(',')
      .map(numberString => {
        //if (!numberString.length) {
          //throw new Error('Invalid number');
        //}

        //if (isNaN(+numberString)) {
          //throw new Error('Invalid number');
        //}

        return +numberString
      })
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
