abstract class Service<I,O> {
  abstract execute(input: I): Promise<O>;
}

export class DFeEventService<I,O> extends Service<I, O> {
  constructor(private provider: any) {
    super();
  }

  async execute(input: I): Promise<O> {
    const message = this.provider.build()

    const response = await this.provider.communicate(message);

    const parsedResponse = this.provider.parse(response);

    return parsedResponse;
  }
}
