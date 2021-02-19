import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Token } from './auth/token.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProxyModule } from './proxy/proxy.module';

import configuration from './config/configuration';
import { APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './common/customValidation.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test'?
      configuration().DBConfigTest as TypeOrmModuleOptions:
      configuration().DBConfig as TypeOrmModuleOptions
    ),
    UserModule,
    AuthModule,
    ProxyModule,
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    }
  ],
  exports: [AuthModule],
})
export class AppModule {
  constructor(private appService: AppService) {
    const updateInterval = process.env.PROXIES_UPDATE_INTERVAL;

    if(process.env.NODE_ENV !== "test"){
      void this.appService.upgradeProxyBase(updateInterval);
    }
  }
}
