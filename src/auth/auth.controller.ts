import { Controller, Res, Body, Post, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AuthInfoDTO, SignupInfoDTO } from './user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async postLogin(
    @Body() body: AuthInfoDTO, 
    @Res() res: Response
  ){
    const [ err, tok ] = await this.authService.login(body.username, body.password);

    if (tok == null) return res.status(400).send(err.message);
    return res.status(200).send(tok);
  }

  @Post("signup")
  async postSignup(
    @Body() body: SignupInfoDTO,
    @Res() res: Response
  ) {
    await this.authService.register(body.username, body.password, body.real_name);

    res.status(200).send("Ok");
  }
}
