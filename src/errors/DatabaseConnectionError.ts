import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class DatabaseConnectionError extends BaseHttpError {
    constructor(){
        super('Error Connecting To Database', StatusCode.INTERNAL_SERVER_ERROR);
    }
}
