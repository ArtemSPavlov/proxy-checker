import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParserService } from './parser.service';
import { ProxySource } from './proxy-source.entity';
import { ParserController } from './parser.controller';
import { ProxyModule } from '../proxy/proxy.module';
import { ParseFromOneElementProvider } from './providers/parseFromOneElement.provider';
import { ParserHostAndPortInOneParentProvider } from './providers/parserHostAndPortInOneParent.provider';
import { ParserHostAndPortInOneElementProvider } from './providers/parserHostAndPortInOneElement.provider';

@Module({
  imports: [TypeOrmModule.forFeature([ProxySource]), HttpModule, ProxyModule],
  providers: [
    ParserService,
    ParseFromOneElementProvider,
    ParserHostAndPortInOneParentProvider,
    ParserHostAndPortInOneElementProvider
  ],
  controllers: [ParserController]
})
export class ParserModule {}
