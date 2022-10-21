import { Controller, Res, Body, Post, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AuthInfoDTO } from './user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  logger = new Logger('Auth')
  
  @Post("login")
  postLogin(
    @Body() body: AuthInfoDTO, 
    @Res() res: Response
  ){
    this.logger.log(1)

    const [ err, tok ] = this.authService.login(body.username, body.password);

    this.logger.log(2, { err, tok })

    if (tok == null) return res.status(400).send(err.message);
    return res.status(200).send(tok);
  }
}
