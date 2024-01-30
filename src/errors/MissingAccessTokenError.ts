import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class MissingAccessTokenError extends BaseHttpError {
    constructor(){
        super('Missing Access Token', StatusCode.UNAUTHORIZED);
    }
}
