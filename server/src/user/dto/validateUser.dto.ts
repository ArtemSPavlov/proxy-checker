import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateUserDto{

    @ApiProperty({
        description: 'Email address',
        type: String,
      })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: 'Password',
        type: String,
        minimum: 3,
      })
    @IsString()
    @Length(3)
    @IsNotEmpty()
    readonly password: string;
}