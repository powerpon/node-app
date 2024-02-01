import { Response, Request } from "express";
import { getLogger } from "../utils/logger";
import winston from "winston";

export const logRequest = (request: Request, response: Response, time: number) => {
    const loggerTimestampFormat = winston.format.timestamp({format: 'ddd, DD MMM YYYY HH:mm:ss'});
    const loggerMessageFormat = winston.format.printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()} ${info.message}`);
    const logger = getLogger(loggerTimestampFormat, loggerMessageFormat);
    logger.info(`${request.method} ${request.originalUrl} - ${time}ms`);
}
