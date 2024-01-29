import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class MissingUserError extends BaseHttpError {
    constructor(){
        super('No User Found', StatusCode.NOT_FOUND);
    }
}
