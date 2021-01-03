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

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    // @UseInterceptors(ClassSerializerInterceptor)
    // @Get()
    // @UseGuards(UserGuard)
    // @ApiTags('user')
    // async user(@Req() req: any): Promise<User>{
    //     return this.userService.getUser(req.user);
    // }

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
    ): Promise<string>{
        return this.userService.validateUser(validateUserDto);
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
        @Param('id', ParseIntPipe) id: string,
        @Body() editUserDto: EditUserDto
    ): Promise<string>{
        return `Edit endpoint: ${id}`;
    }

    // @Get('list/:count')
    // @UseGuards(AdminGuard)
    // @UseInterceptors(ClassSerializerInterceptor)
    // async list(
    //     @Param('count', ParseIntPipe) count: string
    // ): Promise<User[]>{
    //     return "List endpoint";
    // }

    @Delete('delete/:id')
    @UseGuards(AdminGuard)
    async delete(
        @Param('id', ParseIntPipe) id: string,
    ): Promise<string>{
        return "Delete user endpoint";
    }

    // @Get('profile')
    // @UseGuards(UserGuard)
    // async profile(): Promise<User>{
    //     return "Profile endpoint";
    // }

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
