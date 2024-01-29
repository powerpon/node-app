import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { RequestBodyValidationError } from "../errors/RequestBodyValidationError";

export const requestBodyValidate = (validationModel: Joi.ObjectSchema<any>) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { error } = validationModel.validate(request.body); 
        const isValid = error == null;
        if(isValid){
            next();
            return;
        } 
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        throw new RequestBodyValidationError(errorMessage);
    }
}
