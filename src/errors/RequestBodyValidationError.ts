export class RequestBodyValidationError extends Error {
    constructor(message: string){
        super(message);
    }
}