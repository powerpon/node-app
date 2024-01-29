import { IUser, User } from "../models/entities/user.model";
import { BaseRepository } from "./base.repository";

export const userRepository = new BaseRepository<IUser, string>(User);
