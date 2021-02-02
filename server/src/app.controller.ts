import { Controller, Get } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiSecurity('basic')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('app')
  getHello(): string {
    return "Start";
  }
}
