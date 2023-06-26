import util from "util";
import { addColors, createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;
const logFormat = printf((info) => {
  return `[${info.timestamp}] [${info.level}]: ${info.message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: process.env.RELEASE ? "error" : "debug",
    }),
    new transports.File({ filename: "debug.log", level: "debug" }),
  ],
  format: combine(format.colorize(), timestamp(), format.splat(), format.simple(), logFormat),
});

addColors({
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
});
if (!process.env.RELEASE) {
  logger.debug("Logging initialized at debug level");
}

export default logger;
