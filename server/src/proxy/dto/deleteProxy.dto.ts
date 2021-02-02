import { IsIP, IsNotEmpty, IsNumber, IsPort, IsString } from 'class-validator';

export class DeleteProxyDto {

    @IsString()
    @IsNotEmpty()
    @IsIP('4')
    readonly host: string;

    @IsString()
    @IsNotEmpty()
    @IsPort()
    readonly port: string;
}