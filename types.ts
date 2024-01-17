interface UserModel {
    id: number;
    name: string;
    email: string;
    hobbies: string[];
}

interface UpdateUserDTO {
    name: string;
    email: string;
}

interface HobbyDTO {
    hobby: string;
}

export type {UserModel, UpdateUserDTO, HobbyDTO};