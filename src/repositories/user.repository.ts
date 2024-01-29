import { database } from "../database";
import { User } from "../models/entities/user.model";
import { BaseRepository } from "./base.repository";

export const userRepository = new BaseRepository<User, string>(database.users);
