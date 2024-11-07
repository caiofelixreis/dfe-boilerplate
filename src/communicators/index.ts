export abstract class Communicator {
  public abstract communicate(data: unknown): Promise<unknown>;
}