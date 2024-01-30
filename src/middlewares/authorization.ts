import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../models/requests/AuthenticatedRequestModel";
import { MissingPermissionError } from "../errors/MissingPermissionError";

export const isAdmin = (request: AuthenticatedRequest, response: Response, next:NextFunction) => {
    if(request.user.role !== 'admin') {
        throw new MissingPermissionError();
    }
    next();
}