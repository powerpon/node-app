import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class MissingPermissionError extends BaseHttpError {
    constructor(){
        super('User Lacks Permission', StatusCode.FORBIDDEN);
    }
}
