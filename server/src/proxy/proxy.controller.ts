import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';

import { ProxyService } from './proxy.service';
import { UserGuard } from '../auth/user.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AddProxiesOuterDto } from '../common/dto/addProxiesOuter.dto';
import { DeleteProxiesOuterDto } from './dto/deleteProxiesOuter.dto';

@Controller('proxy')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService){}

    @Get()
    @UseGuards(UserGuard)
    async getProxy(){
        return this.proxyService.getProxies(10);
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
    ): Promise<any> {
        return this.proxyService.deleteProxies(body);
    }

    @Get("update")
    @UseGuards(AdminGuard)
    async updatedProxies(){
        const proxyList = await this.proxyService.getProxies();
        return this.proxyService.updateProxies(proxyList);
    }
}
