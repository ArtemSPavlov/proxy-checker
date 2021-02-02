import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ParserStrategiesEnum } from '../enums/parserStrategies.enum';

export class AddProxySourceDto{

  @ApiProperty({
    description: 'Url of web page with list of proxy',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  readonly parserStrategy: ParserStrategiesEnum;

  @ApiProperty({
    description: 'CSS selector of elements containing hosts',
    required: true,
  })
  @IsString()
  readonly hostSelector: string;

  @ApiProperty({
    description: 'CSS selector of elements containing ports',
    required: false,
  })
  @IsString()
  readonly portSelector?: string;

  @ApiProperty({
    description: 'CSS selector of elements containing host and proxy',
    required: false,
  })
  @IsString()
  readonly parentElementSelector?: string;

  @ApiProperty({
    description: 'CSS selector of elements containing country names',
    required: false,
  })
  @IsString()
  readonly countrySelector?: string;

}