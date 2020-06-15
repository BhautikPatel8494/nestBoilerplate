import { Controller, Get, UseGuards, Post, Body, Param, Req, Res, Next, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { EditUserData } from './user.validation';

@Controller('/device/v1/user')
export class UserController {
  constructor(private readonly appService: UserService) { }

  @Get('/')
  @UseGuards(AuthGuard('jwt-device'))
  async userData(@Req() req: Request, @Res() res: Response) {
    this.appService.userData(req, res);
  }

  @Put('/')
  @UseGuards(AuthGuard('jwt-device'))
  async editData(@Body(new ValidationPipe()) edit: EditUserData, @Req() req: Request, @Res() res: Response): Promise<User[]> {
    return this.appService.editData(req, res);
  }
}
