import { IsNotEmpty, IsString, Length } from "class-validator";

export class EditUserDto {

    @IsString()
    @Length(3)
    @IsNotEmpty()
    login?: string;
}