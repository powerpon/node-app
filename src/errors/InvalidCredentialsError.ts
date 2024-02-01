import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class InvalidCredentialsError extends BaseHttpError {
    constructor(){
        super('No User With Such Email Or Password', StatusCode.NOT_FOUND);
    }
}
