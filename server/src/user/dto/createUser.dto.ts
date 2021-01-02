import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto{

    @IsString()
    @Length(3)
    @IsNotEmpty()
    readonly login: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @Length(3)
    @IsNotEmpty()
    readonly password: string;
}