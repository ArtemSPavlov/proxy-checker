import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { Proxy } from './proxy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proxy]), HttpModule],
  providers: [ProxyService],
  controllers: [ProxyController],
  exports: [ProxyService]
})
export class ProxyModule {}
