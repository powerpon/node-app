import Joi from "joi";
import { UserRole } from "../../enums/UserRole";

export interface RegisterRequestModel {
    email: string;
    password: string;
    role: UserRole;
}

export const registerRequestModel = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.values(UserRole)).required()
});
