import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ProxyType } from '../enums/proxyType.enum';

export class AddProxyDto {

    readonly type?: ProxyType;

    @IsString()
    @IsNotEmpty()
    readonly host: string;

    @IsNumber()
    @IsNotEmpty()
    readonly port: number;

    @IsString()
    readonly country?: string;
}