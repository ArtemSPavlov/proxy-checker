import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteProxyDto {

    @IsString()
    @IsNotEmpty()
    readonly host: string;

    @IsNumber()
    @IsNotEmpty()
    readonly port: number;
}