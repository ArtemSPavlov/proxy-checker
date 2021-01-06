import { Body, Controller, Get, Post, UsePipes, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor, Patch, Put, Delete, Query, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';

import { UserGuard } from '../auth/user.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidateUserDto } from './dto/validateUser.dto';
import { ValidationPipe } from '../common/validation.pipe';
import { UserEmailDto } from './dto/userEmail.dto';
import { EditUserDto } from './dto/editUser.dto';
import { changePasswordDto } from './dto/changePassword.dto';
import { Tokens } from './types/tokens.type';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(UserGuard)
    async userProfile(@Req() req: any): Promise<User>{
        return this.userService.getUser(req.user);
    }

    @Post('registration')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ClassSerializerInterceptor)
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async signIn(
        @Body() validateUserDto: ValidateUserDto
    ): Promise<Tokens>{
        return this.userService.validateUser(validateUserDto);
    }

    @Post('change-tokens')
    async getNewTokens(
        @Body() token: RefreshTokenDto
    ): Promise<Tokens>{
        return this.userService.refreshTokens(token.refreshToken);
    }

    @Post('activation')
    @UsePipes(new ValidationPipe())
    async activation(
        @Body() userEmailDto: UserEmailDto
    ): Promise<string>{
        return "Activation endpoint";
    }

    @Get('activate')
    async activate(@Query() activateToken: string): Promise<string>{
        return "Activate endpoint";
    }

    @Put('edit/:id')
    @UseGuards(AdminGuard)
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() editUserDto: EditUserDto
    ): Promise<string>{
        return this.userService.editUser(id, editUserDto);
    }

    @Get('list')
    @UseGuards(AdminGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async listOfUsers(
    ): Promise<User[]>{
        return this.userService.getUsersList();
    }

    @Delete('delete/:id')
    @UseGuards(AdminGuard)
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<string>{
        return this.userService.deleteUser(id);
    }


    @Patch('password')
    @UseGuards(UserGuard)
    async password(
        @Body() password: changePasswordDto
    ): Promise<string>{
        return "Password endpoint";
    }

    @Put('change')
    @UseGuards(UserGuard)
    async change(
        @Body() editUserDto: EditUserDto
    ): Promise<string>{
        return "Change endpoint";
    }

    @Get('logout')
    @UseGuards(AdminGuard)
    async logout(): Promise<string>{
        return "Logout endpoint";
    }

    @Post('change-password')
    async changePassword(
        @Body() userEmailDto: UserEmailDto
    ): Promise<string>{
        return "Change user password endpoint";
    }
}
