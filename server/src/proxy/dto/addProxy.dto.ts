import { IsIP, IsNotEmpty, IsNumber, IsPort, IsString } from 'class-validator';

import { ProxyType } from '../enums/proxyType.enum';

export class AddProxyDto {

    readonly type?: ProxyType;

    @IsString()
    @IsNotEmpty()
    @IsIP('4')
    readonly host: string;

    @IsString()
    @IsNotEmpty()
    @IsPort()
    readonly port: string;

    @IsString()
    readonly country?: string;
}