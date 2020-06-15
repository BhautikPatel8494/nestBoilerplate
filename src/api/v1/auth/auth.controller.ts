import { Controller, Post, Body, Req, Res, Next, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import { VerifyData, AdminUserLogin } from './auth.validation';
import { AuthService } from '../../../auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerUpload } from '../../../shared/services/utility.service';

@Controller('api/v1/admin-user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerUpload({destination: 'adminUser'})))
  async create(@UploadedFile() file, @Body(new ValidationPipe()) data: VerifyData, @Res() res: Response) {
    return await this.authService.addAdminUser(file, data, res);
  }

  @Post('/login')
  async login(@Body(new ValidationPipe()) login: AdminUserLogin, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.authService.login(req, res, next);
  }
}
