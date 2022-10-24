import { Controller, Res, Body, Post, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AuthInfoDTO, SignupInfoDTO } from './user.dto';
import { AuthService } from './auth.service';

class RefreshDTO {
  refreshToken: string;
}

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

  @Post("refresh")
  async refreshToken(
    @Body() body: RefreshDTO,
    @Res() res: Response
  ){
    let newTok = await this.authService.refresh(body.refreshToken);

    if (!newTok) res.status(403).send("Invalid token");

    res.status(200).send({ accessToken: newTok })
  }
}
