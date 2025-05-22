import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home(@Res() res) {
    console.log('appp controleler');
    // res.send('Hello World!');
    res.sendFile('index.html', { root: 'client/build' });
  }
}
