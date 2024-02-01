import { NextFunction, Response } from "express";
import { ErrorResponseModel } from "../models/responses/ErrorResponseModel";
import { BaseHttpError } from "../errors/BaseHttpError";
import { AuthenticatedRequest } from "../models/requests/AuthenticatedRequestModel";
import { StatusCode } from "../enums/StatusCode";

export const errorHandler = async (error: BaseHttpError, request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    const errorResponse: ErrorResponseModel = {
        data: null,
        error: {
            message: error.message
        }
    }
    if(!error.statusCode){
        error.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    }
    response.status(error.statusCode).send(errorResponse);
}
