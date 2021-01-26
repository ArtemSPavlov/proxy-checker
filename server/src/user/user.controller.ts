import { Body, Controller, Get, Post, UsePipes, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor, Patch, Put, Delete, Query, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';

import { UserGuard } from '../auth/user.guard';
import { AdminGuard } from '../auth/admin.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidateUserDto } from './dto/validateUser.dto';
import { ValidationPipe } from '../common/validation.pipe';
import { EditUserDto } from './dto/editUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { Tokens } from './types/tokens.type';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(UserGuard)
    async userProfile(
        @Req() req: any
    ): Promise<User> {
        return this.userService.getUser(req.user);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<string> {
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async signIn(
        @Body() validateUserDto: ValidateUserDto
    ): Promise<Tokens>{
        return this.userService.validateUser(validateUserDto);
    }

    @Post('refresh')
    async getNewTokens(
        @Body() token: RefreshTokenDto
    ): Promise<Tokens>{
        return this.userService.refreshTokens(token.refreshToken);
    }

    @Get('activate')
    async activate(
        @Query() activateToken: string
    ): Promise<string>{
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
    async listOfUsers(): Promise<User[]>{
        return this.userService.getUsersList();
    }

    @Delete('delete/:id')
    @UseGuards(AdminGuard)
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<string>{
        return this.userService.deleteUser(id);
    }

    @Put()
    @UseGuards(UserGuard)
    @UsePipes(new ValidationPipe())
    async changeUser(
        @Req() req: any,
        @Body() editUserDto: EditUserDto
    ): Promise<User>{

        return this.userService.editAuthorizedUser(req.user, editUserDto);
    }

    @Patch()
    @UseGuards(UserGuard)
    @UsePipes(new ValidationPipe())
    async password(
        @Req() req: any,
        @Body() password: ChangePasswordDto
    ): Promise<string>{

        return this.userService.changeAuthorizedUserPassword(req.user, password);
    }
}
