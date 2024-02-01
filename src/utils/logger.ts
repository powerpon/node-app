import winston from "winston";

const productionLogLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    silly: 5
};
  
export const getLogger = (...formats: winston.Logform.Format[]) => winston.createLogger({
    levels: process.env.NODE_ENV === 'production' ? productionLogLevels : undefined,
    format: winston.format.combine(...formats),
    transports: [
        new winston.transports.Console(),
    ],
});
