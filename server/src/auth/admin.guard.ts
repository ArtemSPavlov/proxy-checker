import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../user/enums/roles.enum';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error) {
        if(!user){
          throw new UnauthorizedException();
        }
        if(!user.isActive){
          throw new HttpException('Account activation required', HttpStatus.FORBIDDEN);
        }
        if(user.role !== Roles.admin){
          throw new HttpException('Administrator rights required', HttpStatus.FORBIDDEN);
        }
        return user;
      }
}