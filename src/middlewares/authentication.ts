import { NextFunction, Response } from "express";
import { AuthenticationError } from "../errors/AuthenticationError";
import * as jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../models/requests/AuthenticatedRequestModel";
import { MissingAccessTokenError } from "../errors/MissingAccessTokenError";

export const authenticate = async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    const headerContent = request.get('Authorization');
    if(!headerContent){
        throw new MissingAccessTokenError();
    }
    try{
        const token = headerContent.substring('Bearer '.length);
        const user = jwt.verify(token, process.env.TOKEN_SECRET!);
        request.user = user;
        next();
    }catch(error){
        throw new AuthenticationError();
    }
}
