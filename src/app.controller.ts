import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home(@Res() res) {
    res.sendFile('index.html', { root: 'client/build' });
  }
}
