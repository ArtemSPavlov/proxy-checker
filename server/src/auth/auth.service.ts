import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

    /**
     * Gets token
     * @param user
     * @returns token
     */
    async getToken(user: User): Promise<string> {
        const payload = {
            uuid: user.uuid,
            role: user.role,
            isActive: user.isActive
         },
              expiresIn = { expiresIn: process.env.TOKEN_LIFE_TIME };

        return jwt.sign(payload, process.env.JWT_SECRET, expiresIn);
    }
}
