import { InvalidEmailError } from "../errors/InvalidEmailError";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { MissingUserError } from "../errors/MissingUserError";
import { LoginRequestModel } from "../models/requests/LoginRequestModel";
import { RegisterRequestModel } from "../models/requests/RegisterRequestModel";
import { userRepository } from "../repositories/user.repository"
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export const userService = {
    getById: async (id: string) => {
        const user = await userRepository.getById(id);
        if(user){
            return user;
        }
        throw new MissingUserError();
    },
    registerUser: async (userDTO: RegisterRequestModel) => {
        if(await userRepository.getByEmail(userDTO.email)){
            throw new InvalidEmailError();
        }
        userDTO.password = await bcrypt.hash(userDTO.password, 10);
        return await userRepository.create(userDTO);
    },
    loginUser: async (userDTO: LoginRequestModel) => {
        const user = await userRepository.getByEmail(userDTO.email);
        if(!user || !(await bcrypt.compare(userDTO.password, user.password))) {
            throw new InvalidCredentialsError();
        }
        return jwt.sign(
            {_id: user._id, email: user.email, role: user.role},
            process.env.TOKEN_SECRET!,
            {expiresIn: '2h'}
        );
    }
};
