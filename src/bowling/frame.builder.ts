import {
  IThrow,
  GutterballThrow,
  StrikeThrow,
  SpareThrow,
  NormalThrow
} from './game';

interface IFrame {
  throws: IThrow[];
}

//export class FrameBuilder {
  //constructor(private throws: IThrow[]) {}

  //buildFrames(): IFrame[] {
    //let frames: IFrame[] = [];

    //for (let throw of this.throws) {
      //let frameThrows = [];

      ////if (
    //}
  //}
//}


class ThrowFactory {
  static build(throwString) {
    switch (throwString) {
      case "-":
        return new GutterballThrow();
      case "X":
        return new StrikeThrow();
      case "/":
        return new SpareThrow();
      default:
        return new NormalThrow(throwString);
    }
  }
}

export class ThrowsFactory {
  static build(throwsString: string): IThrow[] {
    return throwsString.split("").map(throwString => ThrowFactory.build(throwString));
  }
}
