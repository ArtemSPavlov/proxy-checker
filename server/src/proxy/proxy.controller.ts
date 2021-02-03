import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { ProxyService } from './proxy.service';
import { UserGuard } from '../auth/user.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AddProxiesOuterDto } from './dto/addProxiesOuter.dto';
import { DeleteProxiesOuterDto } from './dto/deleteProxiesOuter.dto';
import { ProxyType } from './types/proxy.type';

@Controller('proxy')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService){}

    // @Get()
    // @UseGuards(UserGuard)
    // async getProxy(): Promise<ProxyType | string>{
    //     const proxies = await this.proxyService.getActiveProxies(100);
    //     if(!proxies.length){
    //         return 'No active proxy in proxy list';
    //     }
    //     console.log('Proxies: ', proxies);
    //     return this.proxyService.getActiveProxy(proxies);
    // }

    @Get('list/:count')
    @UseGuards(UserGuard)
    async getProxyList(
        @Param('count', ParseIntPipe) count: number,
    ){
        return this.proxyService.getProxies(count);
    }

    @Post()
    @UseGuards(AdminGuard)
    async saveProxy(@Body() body: AddProxiesOuterDto): Promise<string> {
        return this.proxyService.addProxy(body);
    }

    @Delete()
    @UseGuards(AdminGuard)
    async deleteProxy(
        @Body() body: DeleteProxiesOuterDto
    ): Promise<string> {
        return this.proxyService.deleteProxies(body);
    }

    @Get('update')
    @UseGuards(AdminGuard)
    async updatedProxies(): Promise<void>{
        const proxyList = await this.proxyService.getProxies();
        return this.proxyService.updateProxies(proxyList);
    }
}
