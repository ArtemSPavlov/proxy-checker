import { Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { ParserService } from './parser.service';
import { AddProxySourceDto } from '../common/dto/addProxySource.dto';
import { ProxySource } from './proxy-source.entity';
import { ProxyService } from '../proxy/proxy.service';

@Controller('parser')
export class ParserController {
  constructor(
    private parserService: ParserService,
    private proxyService: ProxyService,
  ) {}

  @Get()
  @ApiTags('parser')
  async getSources(): Promise<ProxySource[]>{
    return this.parserService.getProxySource();
  }

  @Post()
  @ApiTags('parser')
  @ApiBody({ type: [AddProxySourceDto] })
  async addSources(dto: AddProxySourceDto[]): Promise<string>{
    return this.parserService.addProxySource(dto);
  }

  @Post('update')
  @ApiTags('parser')
  @ApiBody({ type: AddProxySourceDto })
  async updateSources(dto: AddProxySourceDto): Promise<string>{
    return this.parserService.updateProxySource(dto);
  }

  @Post('delete')
  @ApiTags('parser')
  @ApiBody({ type: AddProxySourceDto })
  async deleteSources(dto: AddProxySourceDto): Promise<string>{
    return this.parserService.deleteProxySource(dto);
  }

  @Get('list')
  async parseProxyList(): Promise<string>{
    const pages = await this.getSources();

    // const proxyList = await this.parserService.getContent(pages[0]);
    //
    // if(proxyList) {
    //   return this.proxyService.addProxy(proxyList);
    // }

      for(const page of pages){
        const proxyList = await this.parserService.getContent(page);

        if(proxyList){
          return this.proxyService.addProxy(proxyList);
        }

        return "Proxies not found!";
    }
  }
}
