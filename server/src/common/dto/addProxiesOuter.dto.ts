import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { AddProxyDto } from "./addProxy.dto";

export class AddProxiesOuterDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddProxyDto)
    proxies: AddProxyDto[]

}