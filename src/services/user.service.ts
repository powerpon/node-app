import { MissingUserError } from "../errors/MissingUserError";
import { IUser } from "../models/entities/user.model";
import { userRepository } from "../repositories/user.repository"

export const userService = {
    getById: async (id: string) => {
        const user = await userRepository.getById(id);
        if(user){
            return user;
        }
        throw new MissingUserError();
    }
};
