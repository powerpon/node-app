import { Request } from "express";
import { IUser } from "../entities/user.model";

export interface AuthenticatedRequest extends Request {
    user?: any;
}