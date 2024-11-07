abstract class Provider<I, O> {
  abstract name: string;

  abstract build(input: I);
  abstract parse(response): O;

  communicate(message) {
    return "Response";
  }
}

export class DFeEventProvider extends Provider<string,number> {
    name = "DFeEventProvider";
    
    build(input: string) {
        return "Message";
    }
    
    parse(response) {
        return 10;
    }
}
