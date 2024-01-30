import { StatusCode } from "../enums/StatusCode";
import { IUser } from "../models/entities/user.model";
import { AuthenticatedRequest } from "../models/requests/AuthenticatedRequestModel";
import { UserLoginPostResponseModel } from "../models/responses/UserLoginPostResponseModel";
import { UserRegisterPostResponseModel } from "../models/responses/UserRegisterPostResponseModel";
import { userService } from "../services/user.service";
import { Response } from 'express';

export const authController = {
    registerUser: async (request: AuthenticatedRequest, response: Response) => {
        const user: IUser = await userService.registerUser(request.body);
        const userResponseSuccess: UserRegisterPostResponseModel = {
            data: {
                _id: user._id,
                email: user.email,
                role: user.role
            },
            error: null
        };
        response.status(StatusCode.OK).send(userResponseSuccess);
    },
    loginUser: async (request: AuthenticatedRequest, response: Response) => {
        const token: string = await userService.loginUser(request.body);
        const userResponseSuccess: UserLoginPostResponseModel = {
            data: {
                token: token
            },
            error: null
        };
        response.status(StatusCode.OK).send(userResponseSuccess);
    },
};
