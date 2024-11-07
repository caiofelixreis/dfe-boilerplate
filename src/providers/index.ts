import { Communicator } from "../communicators";

abstract class Provider<I, O> {
  abstract name: string;

  abstract schema: {
    builder: any;
    communicator: Communicator;
    parser: any;
  };

  abstract build(input: I);
  abstract parse(response): O;
  abstract communicate(message): unknown;
}

export class DFeEventProvider extends Provider<string, number> {
  name = "DFeEventProvider";
  
  schema: { builder: any; communicator: Communicator; parser: any };

  build(input: string) {
    return "Message";
  }

  parse(response) {
    return 10;
  }

  communicate(message) {
    return "Response";
  }
}
