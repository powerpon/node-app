import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class RequestBodyValidationError extends BaseHttpError {
    constructor(message: string){
        super(message, StatusCode.BAD_REQUEST);
    }
}
