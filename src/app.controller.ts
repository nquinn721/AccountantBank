import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home(@Res() res) {
    res.sendFile('login.html', { root: 'src' });
  }

  @Post('/login')
  login(@Res() res, @Body() body, @Session() session) {
    if (body.pw === 'p1o2k3e4r5!') {
      session.isSignedIn = true;
      return res.redirect('/site');
    }
  }

  @Get('/site')
  site(@Res() res, @Session() session) {
    if (session.isSignedIn) {
      res.sendFile('index.html', { root: 'new-client/build' });
    } else {
      res.sendFile('login.html', { root: 'src' });
    }
  }
}
