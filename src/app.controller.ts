import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home(@Res() res) {
    res.sendFile('login.html', { root: 'src' });
  }

  @Post('/login')
  login(@Res() res, @Body() body) {
    if (body.pw === 'p1o2k3e4r5!') return res.redirect('/site');
  }

  @Get('/site')
  site(@Res() res) {
    console.log('Site request received');
    res.sendFile('index.html', { root: 'client/build' });
  }
}
