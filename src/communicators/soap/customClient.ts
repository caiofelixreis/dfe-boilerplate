import { HttpClient, IHeaders, IOptions } from "soap";
import request from "request";

export interface CustomClientOptions extends IOptions {
  proxy?: string;
  timeout?: number;
}

export class CustomClient extends HttpClient {
  protected static defaultTimeout = 360000;
  constructor(protected options?: CustomClientOptions | undefined) {
    super({
      ...(options || {}),
      request: request.defaults(
        CustomClient.buildRequestDefaultParams(options)
      ),
    });
  }

  protected static buildRequestDefaultParams(options?: CustomClientOptions) {
    let defaults: Record<string, any> = {};

    defaults.timeout = options?.timeout || this.defaultTimeout;
    if (options?.proxy)
      defaults = {
        ...defaults,
        proxy: options?.proxy,
        agent: false,
        pool: { maxSockets: 200 },
      };

    return defaults;
  }

  request(
    rurl: string,
    data: any,
    callback: (error: any, res?: any, body?: any) => any,
    exheaders?: IHeaders,
    exoptions?: any,
    caller?: any
  ) {
    return super.request(
      rurl,
      data,
      callback,
      exheaders,
      { ...exoptions, timeout: CustomClient.defaultTimeout },
      caller
    );
  }
}

export const getOutboundSoapClient = (options: { proxy?: string }) => {
  return new CustomClient({
    proxy: options.proxy,
  });
};
