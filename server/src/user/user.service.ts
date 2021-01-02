import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidateUserDto } from './dto/validateUser.dto';
import { AuthService } from '../auth/auth.service';
import { Payload } from '../common/interfaces/payload.interface';

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
    async validateUser(dto: ValidateUserDto): Promise<string>{
        const user = await this.usersRepository.findOne({email: dto.email});
        if(await bcrypt.compare(dto.password, user.password)){
            user.password = dto.password;
            return this.authService.getToken(user);
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
}
