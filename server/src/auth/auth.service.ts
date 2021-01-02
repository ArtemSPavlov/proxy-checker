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
        const payload = { uuid: user.uuid },
              expiresIn = { expiresIn: '24h' };

        return jwt.sign(payload, process.env.JWT_SECRET, expiresIn);
    }
}
