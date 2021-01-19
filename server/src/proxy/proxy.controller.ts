import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { ProxyService } from './proxy.service';
import { AddProxyDto } from '../common/dto/addProxy.dto';
import { UserGuard } from '../auth/user.guard';

@Controller('proxy')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService){}

    @UseGuards(UserGuard)
    @Get()
    async getProxy(){
        return this.proxyService.getProxies(10);
    }

    @Post()
    @ApiTags('proxy')
    @ApiBody({ type: [AddProxyDto] })
    async saveProxy(@Body() body: AddProxyDto[]): Promise<string> {
        return this.proxyService.addProxy(body);
    }

    @Delete()
    @ApiTags('proxy')
    async deleteProxy(): Promise<string> {
        return "Proxy deleted";
    }

    @Get("update")
    async updatedProxies(){
        const proxyList = await this.proxyService.getProxies();
        return this.proxyService.updateProxies(proxyList);
    }
}
