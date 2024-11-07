import { NextFunction, Request, Response } from "express";
import { Context } from "../context";

export function initContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const store = {
    request_id: Math.random().toString(16).substring(2),
    init_time: new Date(),
    headers: req.headers,
    tenantid: req.headers.tenantid,
  };

  Context.bind(store, next);
}

export function logRequestEndMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on("finish", () => {
    const end_time = new Date();

    const ctxStore = Context.getStore();

    if (!ctxStore) return;

    console.log(`[
      request_id: ${ctxStore?.request_id || "unknown"}
      method: ${req.method}
      route: ${req.originalUrl}
      status: ${res.statusCode}
      duration_ms: ${end_time.getTime() - ctxStore.init_time.getTime()}
      timestamp: ${new Date().toISOString()}
      init_time: ${ctxStore.init_time.toISOString()}
      end_time: ${end_time.toISOString()}
      tenantid: ${ctxStore.tenantid}
      headers: ${JSON.stringify(ctxStore?.headers) || "unknown"}
]`);
  });

  next();
}
