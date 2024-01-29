import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class MissingCartError extends BaseHttpError {
    constructor(){
        super('No Cart Found', StatusCode.NOT_FOUND);
    }
}
