import { StatusCode } from "../enums/StatusCode";
import { BaseHttpError } from "./BaseHttpError";

export class InvalidEmailError extends BaseHttpError {
    constructor(){
        super('Email Is Not Valid', StatusCode.BAD_REQUEST);
    }
}