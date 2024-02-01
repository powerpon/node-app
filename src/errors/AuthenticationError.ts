import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class AuthenticationError extends BaseHttpError {
    constructor(){
        super('User Is Not Authorized', StatusCode.FORBIDDEN);
    }
}
