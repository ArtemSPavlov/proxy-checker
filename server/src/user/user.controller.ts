import { Body, Controller, Get, Post, UsePipes, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor, Patch, Put, Delete, Query, Param, ParseIntPipe } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    // @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async edit(
        @Param('id', ParseIntPipe) id: string,
        @Body() editUserDto: EditUserDto
    ): Promise<string>{
        return `Edit endpoint: ${id}`;
    }

    // @Get('list/:count')
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(ClassSerializerInterceptor)
    // async list(
    //     @Param('count', ParseIntPipe) count: string
    // ): Promise<User[]>{
    //     return "List endpoint";
    // }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param('id', ParseIntPipe) id: string,
    ): Promise<string>{
        return "Delete user endpoint";
    }

    // @Get('profile')
    // @UseGuards(JwtAuthGuard)
    // async profile(): Promise<User>{
    //     return "Profile endpoint";
    // }

    @Patch('password')
    @UseGuards(JwtAuthGuard)
    async password(
        @Body() password: changePasswordDto
    ): Promise<string>{
        return "Password endpoint";
    }

    @Put('change')
    @UseGuards(JwtAuthGuard)
    async change(
        @Body() editUserDto: EditUserDto
    ): Promise<string>{
        return "Change endpoint";
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
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
