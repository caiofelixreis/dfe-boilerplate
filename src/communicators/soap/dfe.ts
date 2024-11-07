import { SoapCommunicator } from ".";
import { Context } from "../../context";

abstract class DFeSoapCommunicator extends SoapCommunicator {
    protected proxy = undefined;
  
    protected getUrl() {
      const ctx = Context.getStore();
      if (ctx.isToCommunicateProd) return this.getProdUrl();
      return this.getHomUrl();
    }
  
    protected getMethodName(): string {
      const ctx = Context.getStore();
      if (ctx.isToCommunicateProd) return this.getProdMethodName();
      return this.getHomMethodName();
    }
  
    protected abstract getHomMethodName(): string;
    protected abstract getProdMethodName(): string;
  }
  