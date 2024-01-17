import { HobbyDTO, UpdateUserDTO, UserModel } from "./types";

export function isArrayOfStrings(arr: any): arr is string[] {
    if (!Array.isArray(arr)) {
      return false;
    }
    return arr.every((item) => typeof item === 'string');
}

export function isUserModel(obj: any): obj is UserModel {
    if (typeof obj.id === 'number' && typeof obj.name === 'string' && typeof obj.email === 'string' && isArrayOfStrings(obj.hobbies)){
        return true;
    };
    return false;
}

export function isUpdateUserDTO(obj: any): obj is UpdateUserDTO {
    if (typeof obj.name === 'string' && typeof obj.email === 'string'){
        return true;
    };
    return false;
}

export function isHobbyDTO(obj: any): obj is HobbyDTO {
    if (typeof obj.hobby === 'string'){
        return true;
    };
    return false;
}