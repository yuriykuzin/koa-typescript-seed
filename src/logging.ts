import * as Koa from 'koa';
import { config } from './config';
import * as winston from 'winston';

// tslint:disable-next-line:no-any
export function logger(winstonInstance: any): any {
  // tslint:disable-next-line:no-any
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    const start: number = new Date().getMilliseconds();

    await next();

    const ms: number = new Date().getMilliseconds() - start;

    let logLevel: string = 'info';

    if (ctx.status >= 500) {
      logLevel = 'error';
    }
    if (ctx.status >= 400) {
      logLevel = 'warn';
    }

    const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

    winstonInstance.configure({
      level: config.debugLogging ? 'debug' : 'info',
      transports: [
        //
        // - Write all logs error (and below) to `error.log`.
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //
        // - Write to all logs with specified level to console.
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
      ],
    });

    winstonInstance.log(logLevel, msg);
  };
}
