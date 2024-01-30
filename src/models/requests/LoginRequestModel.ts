import Joi from "joi";

export interface LoginRequestModel {
    email: string;
    password: string;
}

export const loginRequestModel = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
