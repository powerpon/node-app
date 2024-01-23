export class MissingCartError extends Error {
    constructor(){
        super('No Cart Found');
    }
}