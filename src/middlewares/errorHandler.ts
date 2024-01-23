import { NextFunction, Request, Response } from "express";
import { MissingCartError } from "../errors/MissingCartError";
import { MissingProductError } from "../errors/MissingProductError";
import { MissingUserError } from "../errors/MissingUserError";
import { StatusCode } from "../enums/StatusCode";
import { ErrorResponseModel } from "../models/responses/ErrorResponseModel";
import { EmptyCartError } from "../errors/EmptyCartError";
import { AuthenticationError } from "../errors/AuthenticationError";
import { RequestBodyValidationError } from "../errors/RequestBodyValidationError";

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    const errorResponse: ErrorResponseModel = {
        data: null,
        error: {
            message: error.message
        }
    }
    if(
        error instanceof MissingCartError ||
        error instanceof MissingProductError ||
        error instanceof MissingUserError
    ){
        response.status(StatusCode.NOT_FOUND).send(errorResponse);
        return;
    }
    if(
        error instanceof EmptyCartError ||
        error instanceof RequestBodyValidationError
    ) {
        response.status(StatusCode.BAD_REQUEST).send(errorResponse);
        return;
    }
    if(
        error instanceof AuthenticationError
    ) {
        response.status(StatusCode.UNAUTHORIZED).send(errorResponse);
        return;
    }
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send(errorResponse);
}