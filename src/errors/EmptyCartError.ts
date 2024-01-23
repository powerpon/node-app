export class EmptyCartError extends Error {
    constructor(){
        super('Cart Is Empty');
    }
}