import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error) {
        if(!user){
          throw new UnauthorizedException();
        }
        if(!user.isActive){
          throw new HttpException('Account activation required', HttpStatus.FORBIDDEN);
        }
        return user;
      }
}
