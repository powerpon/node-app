import { MissingUserError } from "../errors/MissingUserError";
import { User } from "../models/entities/user.model";
import { userRepository } from "../repositories/user.repository"

export const userService = {
    getById: (id: string): User => {
        const user = userRepository.getById(id);
        if(user){
            return user;
        }
        throw new MissingUserError();
    }
};
