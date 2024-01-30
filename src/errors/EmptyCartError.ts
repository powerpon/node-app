import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class EmptyCartError extends BaseHttpError {
    constructor(){
        super('Cart Is Empty', StatusCode.BAD_REQUEST);
    }
}
