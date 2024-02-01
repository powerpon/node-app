import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { StatusCode } from "../enums/StatusCode";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";

const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_URI);

export const appController = {
    healthCheck: async (request: Request, response: Response) => {
        const dbStatus = await (await mongoClient.connect()).db().command({ping: 1});
        if (dbStatus.ok === 1) {
            response.status(StatusCode.OK).send('OK');
            return;
        }
        throw new DatabaseConnectionError();
    }
};
