import { IsNotEmpty, IsString, Length } from "class-validator";

export class EditUserLoginDto {

    @IsString()
    @Length(3)
    @IsNotEmpty()
    login?: string;
}