import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { DeleteProxyDto } from "./deleteProxy.dto";

export class DeleteProxiesOuterDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DeleteProxyDto)
    proxies: DeleteProxyDto[]
}