import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ValidateUserDto{

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @Length(3)
    @IsNotEmpty()
    readonly password: string;
}