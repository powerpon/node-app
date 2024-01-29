import { NextFunction, Request, Response } from "express";
import { MissingCartError } from "../errors/MissingCartError";
import { MissingProductError } from "../errors/MissingProductError";
import { MissingUserError } from "../errors/MissingUserError";
import { StatusCode } from "../enums/StatusCode";
import { ErrorResponseModel } from "../models/responses/ErrorResponseModel";
import { BaseHttpError } from "../errors/BaseHttpError";

export const errorHandler = (error: BaseHttpError, request: Request, response: Response, next: NextFunction) => {
    const errorResponse: ErrorResponseModel = {
        data: null,
        error: {
            message: error.message
        }
    }
    response.status(error.statusCode).send(errorResponse);
}
