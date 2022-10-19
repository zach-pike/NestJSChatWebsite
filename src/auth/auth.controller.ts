import { Controller, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { AuthInfoDTO } from './user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post("login")
  postLogin(
    @Body() body: AuthInfoDTO, 
    @Res() res: Response
  ){
    const [ err, tok ] = this.authService.login(body.username, body.password);
    if (err != null) {
      return 
        res
        .status(400)
        .send("Invalid username/password");
    }
    return res.status(200).send(tok);
  }
}
