import { IsNotEmpty, IsString, Length } from "class-validator";

export class ChangePasswordDto {

    @IsString()
    @Length(3)
    @IsNotEmpty()
    readonly password: string;
}