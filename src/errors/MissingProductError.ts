export class MissingProductError extends Error {
    constructor(){
        super('No Product Found');
    }
}