import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ProxyType } from '../enums/proxyType.enum';

export class AddProxyDto {

    @ApiProperty({
        description: 'Proxy type',
        enum: ProxyType,
        required: false,
      })
    readonly type?: ProxyType;

    @ApiProperty({
        description: 'Proxy host',
        type: String,
        required: true,
      })
    @IsString()
    @IsNotEmpty()
    readonly host: string;

    @ApiProperty({
        description: 'Proxy port',
        type: Number,
        required: true,
      })
    @IsNumber()
    @IsNotEmpty()
    readonly port: number;

    @ApiProperty({
        description: 'Proxy country',
        type: String,
        required: false,
      })
    @IsString()
    @IsNotEmpty()
    readonly country?: string;
}