import { database } from "../database";
import { User } from "../models/entities/user.model";

export const userRepository = { 
    create: (user: User): User => {
        database.users.push(user);
        return user;
    },
    getById: (id: string): User => {
        return database.users.find((user: User) => user.id === id);
    },
    update: (id: string, newUser: User): User => {
        const oldUserIdx = database.users.findIndex((user: User) => user.id === id);
        if(oldUserIdx !== -1){
            database.users[oldUserIdx] = newUser;
            return newUser;
        }
    },
    delete: (id: string): void => {
        database.users = database.users.filter((user: User) => user.id !== id);
    },
    getAll: (): User[] => {
        return database.users;
    }
}