import { Communicator } from "..";
import {
  SefazCommunicatorOptions,
  communicate as sefazCommunicate,
} from "sefaz-communicator";
import { getOutboundSoapClient } from "./customClient";
import { Context } from "../../context";

export interface ISoapMessage {
  xmlString: string;
  body: any;
}

interface ISefazCommunicator {
  url: string;
  methodName: string;
  message: ISoapMessage;
  options: SefazCommunicatorOptions;
}

export abstract class SoapCommunicator extends Communicator {
  protected abstract proxy?: string;

  public async communicate(data: any): Promise<unknown> {
    const metaData: ISefazCommunicator = this.getMetaData(data);

    Context.updateStore({
      ...Context.getStore(),
      communicate_time: new Date().getTime(),
      communicate_url: metaData.url,
      communicate_method: metaData.methodName,
    });

    const response = await sefazCommunicate(
      metaData.url,
      metaData.methodName,
      metaData.message,
      metaData.options
    );

    return response;
  }

  private getMetaData(data: any): ISefazCommunicator {
    return {
      url: this.getUrl(),
      methodName: this.getMethodName(),
      message: data.message,
      options: this.getOptions(),
    };
  }

  protected getOptions(): SefazCommunicatorOptions {
    return {
      escapeXML: false,
      httpClient: getOutboundSoapClient({ proxy: this.proxy }),
    };
  }

  protected abstract getUrl(): string;
  protected abstract getMethodName(): string;
}
