import { Controller, Get, SetMetadata, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @SetMetadata('FILE_NAME', 'index.hbs')
  getHello(): any {
    return this.appService.getHello();
  }

}
