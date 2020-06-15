import { Controller, Post, Body, Req, Res, Next, ValidationPipe } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import { FacebookLogin, CreateUser, LoginUser } from './auth.validation';
import { AuthService } from '../../../auth/auth.service';
import { SendOtpResponse } from '../../../auth/interfaces/auth.responses.interface';

@Controller('/device/v1/user')
export class DeviceAuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/facebook-login')
  async facebookLogin(@Body(new ValidationPipe()) payload: FacebookLogin) {
    return await this.authService.facebookLogin(payload);
  }

  @Post('/register')
  async crateUser(@Body(new ValidationPipe()) req: CreateUser) {
    return await this.authService.createUser(req);
  }

  @Post('/login')
  async loginUser(@Body(new ValidationPipe()) req: LoginUser, @Res() res: Response) {
    return await this.authService.loginUser(req, res);
  }
}
