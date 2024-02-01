import { IUser, User } from "../models/entities/user.model";
import { BaseRepository } from "./base.repository";

class UserRepository extends BaseRepository<IUser, string> {
    constructor() {
        super(User);
    }

    async getByEmail(email: string) {
        return await User.findOne({email: email}).exec();
    }
}

export const userRepository = new UserRepository();
