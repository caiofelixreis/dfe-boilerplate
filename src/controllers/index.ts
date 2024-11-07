import { Request } from "express";
import { validationResult } from "express-validator";
import { DFeEventProvider } from "../providers";
import { DFeEventService } from "../services";

abstract class Controller {
  protected abstract process(): Promise<any>;

  async run(req: Request) {
    this.validateRequest(req);

    const result = await this.process();

    return this.returnToClient(result);
  }

  protected validateRequest(req: Request) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new Error("Requisição inválida");
  }

  protected returnToClient(response: any) {
    return response;
  }
}

export class DFeEventController extends Controller {
  protected async process() {
    const provider = this.getProvider();

    const service = new DFeEventService<string, number>(provider);

    const response = await service.execute("");

    return response;
  }

  protected getProvider() {
    return new DFeEventProvider();
  }
}
