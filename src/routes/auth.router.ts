import express from 'express';
import { requestBodyValidate } from '../middlewares/requestBodyValidation';
import { registerRequestModel } from '../models/requests/RegisterRequestModel';
import { authController } from '../controllers/auth.controller';
import { asyncHandler } from '../helpers/asyncHandler';
import { loginRequestModel } from '../models/requests/LoginRequestModel';

const authRouter = express.Router();

authRouter.post('/register', requestBodyValidate(registerRequestModel), asyncHandler(authController.registerUser));
authRouter.post('/login', requestBodyValidate(loginRequestModel), asyncHandler(authController.loginUser));

export default authRouter;