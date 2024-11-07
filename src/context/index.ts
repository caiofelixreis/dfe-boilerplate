import { AsyncLocalStorage } from "async_hooks";

export interface IBaseContext {
  request_id: string;
  init_time: Date;
  tenantid: string;
  isToCommunicateProd?: boolean
}

export class Context {
  static asyncLocalStorage = new AsyncLocalStorage<IBaseContext>();

  static bind(store: any, callback: () => unknown): void {
    Context.asyncLocalStorage.run(store, callback);
  }

  static getStore(): any {
    return Context.asyncLocalStorage.getStore();
  }
}
