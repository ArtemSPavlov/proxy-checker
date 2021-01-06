import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { Token } from './auth/token.entity';
import { Proxy } from './proxy/proxy.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProxyModule } from './proxy/proxy.module';
import { ParserModule } from './parser/parser.module';
import { ProxySource } from './parser/proxy-source.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Proxy, Token, ProxySource],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProxyModule,
    ParserModule,
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
  exports: [AuthModule],
})
export class AppModule {
  constructor(private appService: AppService) {
    const updateInterval = process.env.PROXIES_UPDATE_INTERVAL;

    void this.appService.upgradeProxyBase(updateInterval);
  }
}
