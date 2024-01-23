export class AuthenticationError extends Error {
    constructor(){
        super('User Is Not Authorized');
    }
}