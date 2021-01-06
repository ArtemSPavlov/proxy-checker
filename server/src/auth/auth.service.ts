import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Token } from './token.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>
    ){}

    /**
     * Gets token
     * @param user
     * @returns token
     */
    async getAccessToken(user: User): Promise<string> {
        const payload = {
            uuid: user.uuid,
            role: user.role,
            isActive: user.isActive
         },
              expiresIn = { expiresIn: process.env.JWT_LIFE_TIME };

        return jwt.sign(payload, process.env.JWT_SECRET, expiresIn);
    }

        /**
     * Gets token
     * @param user
     * @returns token
     */
    async getRefreshToken(user: User): Promise<Token> {
        const payload = {
            uuid: user.uuid,
            role: user.role,
            isActive: user.isActive,
            created: (new Date()).getTime()
         },
            expiresIn = { expiresIn: process.env.REFRESH_TOKEN_LIFE_TIME };

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, expiresIn);

        await this.tokenRepository.delete({user: user});
        return this.tokenRepository.save({user: user, token: refreshToken});
    }

    async checkRefreshToken(token: string): Promise<boolean> {
        return await !!this.tokenRepository.find({token: token});
    }
}
