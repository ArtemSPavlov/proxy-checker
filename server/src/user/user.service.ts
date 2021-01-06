import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidateUserDto } from './dto/validateUser.dto';
import { AuthService } from '../auth/auth.service';
import { Payload } from '../common/interfaces/payload.interface';
import { Tokens } from './types/tokens.type';
import { EditUserDto } from './dto/editUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private authService: AuthService,
    ){}

    /**
     * Gets users
     * @returns users
     */
    async getUser(payload: Payload): Promise<User>{
        return this.usersRepository.findOne({uuid: payload.uuid});
    }

    /**
     * Creates user
     * @param dto
     * @returns user
     */
    async createUser(dto: CreateUserDto): Promise<User>{
        if(await this.checkEmailExists(dto)){
            throw new HttpException("Email has been used", HttpStatus.BAD_REQUEST);
        } else {
            const hash = await bcrypt.hash(dto.password, 10);
            return this.usersRepository.save({login: dto.login, password: hash, email: dto.email});
        }
    }

    /**
     * Validates user
     * @param dto
     * @returns user
     */
    async validateUser(dto: ValidateUserDto): Promise<Tokens>{
        const user = await this.usersRepository.findOne({email: dto.email});
        if(await bcrypt.compare(dto.password, user.password)){
            user.password = dto.password;
            const refreshToken = await (await this.authService.getRefreshToken(user)).token;
            const accessToken = await this.authService.getAccessToken(user);

            return {
                refresh_token: refreshToken,
                access_token: accessToken
            }
        }
        throw new HttpException('Email or password incorrect!', HttpStatus.BAD_REQUEST);
    }

    /**
     * Checks email for uniqueness
     * @param dto
     * @returns email exists
     */
    private async checkEmailExists(dto: CreateUserDto): Promise<number> {
        return this.usersRepository.count({email: dto.email});
    }

    async refreshTokens(refreshToken: string): Promise<Tokens>{
        try {
            const tokenPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const tokenStatus = await this.authService.checkRefreshToken(refreshToken);

            if(!!tokenStatus && 'object' === typeof(tokenPayload) && tokenPayload.hasOwnProperty('uuid')){
                const user = await this.usersRepository.findOne({uuid: tokenPayload['uuid']});
                const refreshToken = await (await this.authService.getRefreshToken(user)).token;
                const accessToken = await this.authService.getAccessToken(user);

                return {
                    refresh_token: refreshToken,
                    access_token: accessToken
                }
            }
        } catch (error) {
            throw new UnauthorizedException('Refresh token not valid');
        }
    }

    async editUser(id: number, dto: EditUserDto): Promise<string>{
        await this.usersRepository.update({id: id}, dto);
        return 'User updated!';
    }

    async getUsersList(): Promise<User[]>{
        return await this.usersRepository.find();
    }

    async deleteUser(id: number): Promise<string>{
        const user = new User();
        user.id = id;

        await this.usersRepository.remove(user);

        return 'User deleted!';
    }

    async editAuthorizedUser(user: User, dto: EditUserDto): Promise<User>{
        await this.usersRepository.update({uuid: user.uuid}, dto);

        return await this.usersRepository.findOne({uuid: user.uuid});
    }
}
