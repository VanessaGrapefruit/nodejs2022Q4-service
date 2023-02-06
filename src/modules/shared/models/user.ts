import { IsNotEmpty } from "class-validator";

export interface UserDTO {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number | null; // timestamp of last update
}

export class CreateUserDto {
    @IsNotEmpty() login: string;
    @IsNotEmpty() password: string;
}

export class UpdatePasswordDto {
    @IsNotEmpty() oldPassword: string;
    @IsNotEmpty() newPassword: string;
}