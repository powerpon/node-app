import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { AuthenticationError } from "../errors/AuthenticationError";
import { MissingUserError } from "../errors/MissingUserError";

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
    try{
        userService.getById(request.get('x-user-id'));
        next();
    }catch(error){
        if(error instanceof MissingUserError){
            throw new AuthenticationError();
        }
        throw new Error(error.message);
    }
}
