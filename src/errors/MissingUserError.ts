export class MissingUserError extends Error {
    constructor(){
        super('No User Found');
    }
}