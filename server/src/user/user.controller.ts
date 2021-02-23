import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Req,
    UseInterceptors,
    ClassSerializerInterceptor,
    Patch,
    Put,
    Delete,
    Param,
    ParseIntPipe
} from '@nestjs/common';

import { UserGuard } from '../auth/user.guard';
import { AdminGuard } from '../auth/admin.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidateUserDto } from './dto/validateUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { Tokens } from './types/tokens.type';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    @UseGuards(UserGuard)
    async userProfile(
        @Req() req: any
    ): Promise<User> {
        return this.userService.getUser(req.user);
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<string> {
        return this.userService.createUser(createUserDto);
    }

    @Put()
    @UseGuards(UserGuard)
    async changeUser(
        @Req() req: any,
        @Body() editUserDto: EditUserDto
    ): Promise<User>{

        return this.userService.editAuthorizedUser(req.user, editUserDto);
    }

    @Patch()
    @UseGuards(UserGuard)
    async password(
        @Req() req: any,
        @Body() password: ValidateUserDto
    ): Promise<string>{

        return this.userService.changeAuthorizedUserPassword(req.user, password);
    }

    @Post('login')
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

    @Put('edit/:id')
    @UseGuards(AdminGuard)
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() requestBody: EditUserDto
    ): Promise<User>{
        return this.userService.editUser(id, requestBody);
    }

    @Get('list')
    @UseGuards(AdminGuard)
    async listOfUsers(): Promise<User[]>{
        return this.userService.getUsersList();
    }

    @Delete('delete/:id')
    @UseGuards(AdminGuard)
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<User>{

        return this.userService.deleteUser(id);
    }
}
