import { IsNotEmpty, IsString, Length } from "class-validator";
import { Roles } from "../enums/roles.enum";

export class EditUserDto {

    @IsString()
    @Length(3)
    @IsNotEmpty()
    login?: string;

    @IsString()
    @Length(3)
    @IsNotEmpty()
    password?: string;

    isActive?: boolean;

    role?: Roles;
}