import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class MissingProductError extends BaseHttpError {
    constructor(){
        super('No Product Found', StatusCode.NOT_FOUND);
    }
}
