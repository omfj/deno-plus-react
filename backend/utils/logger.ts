import {
  green,
  cyan,
  red,
  blue,
  yellow,
  bgBlue,
} from "https://deno.land/std@0.192.0/fmt/colors.ts";
import { format } from "https://deno.land/std@0.192.0/datetime/mod.ts";
import { Middleware } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { DEV } from "../env.ts";

const APP_NAME = "🦦 Otter";

type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR" | "SYSTEM";

type LoggerOptions = {
  logLevel?: LogLevel;
  production?: boolean;
};

class Logger {
  logLevel: LogLevel;
  production: boolean;

  constructor({ logLevel = "INFO", production = false }: LoggerOptions) {
    this.logLevel = logLevel;
    this.production = production;
  }

  private log = (level: LogLevel, message: string) => {
    if (!this.shouldLog(level)) return;

    const timestamp = format(new Date(), "yyyy-MM-dd hh:mm:ss");
    switch (level) {
      case "INFO":
        console.log(green(`[INFO] ${timestamp} ${level} - ${message}`));
        break;
      case "DEBUG":
        console.log(cyan(`[DEBUG] ${timestamp} ${level} - ${message}`));
        break;
      case "ERROR":
        console.log(red(`[ERROR] ${timestamp} ${level} - ${message}`));
        break;
      case "SYSTEM":
        console.log(yellow(`[SYSTEM] ${timestamp} ${level} - ${message}`));
        break;
      default:
        console.log(yellow(`[WARN] ${timestamp} ${level} - ${message}`));
        break;
    }
  };

  info = (...message: Array<string>) => {
    this.log("INFO", message.join(" "));
  };

  debug = (...message: Array<string>) => {
    this.log("DEBUG", message.join(" "));
  };

  error = (...message: Array<string>) => {
    this.log("ERROR", message.join(" "));
  };

  warn = (...message: Array<string>) => {
    this.log("WARN", message.join(" "));
  };

  private getLevel = (logLevel: LogLevel): number => {
    switch (logLevel) {
      case "INFO":
        return 0;
      case "DEBUG":
        return 1;
      case "ERROR":
        return 2;
      default:
        return 3;
    }
  };

  private shouldLog = (level: LogLevel): boolean => {
    const logLevel = this.getLevel(this.logLevel);
    const currentLogLevel = this.getLevel(level);

    return logLevel >= currentLogLevel;
  };

  middleware: Middleware = async (ctx, next) => {
    const { method, url } = ctx.request;

    const start = Date.now();
    await next();
    const ms = Date.now() - start;

    const { status } = ctx.response;

    console.log(bgBlue("\n" + APP_NAME));
    console.log(
      `${blue(url.pathname)} - ${yellow(method)} - ${cyan(
        status.toString()
      )} - ${red(`${ms}ms`)}`
    );
  };
}

const logger = new Logger({ logLevel: "INFO", production: !DEV });

export default logger;
