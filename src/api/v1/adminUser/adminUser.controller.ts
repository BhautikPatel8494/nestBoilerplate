// tslint:disable-next-line: max-line-length
import { Controller, Get, UseGuards, Param, Req, Res, Delete, Put, Request, Body, ValidationPipe } from '@nestjs/common';
import { AdminUserService } from './adminUser.service';
import { AdminUser } from './adminUser.interface';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { EditAdmindata } from './adminUser.validation';

@Controller('/api/v1/admin-user')
export class AdminUserController {
  constructor(private readonly appService: AdminUserService) { }

  @Get('/list')
  @UseGuards(AuthGuard())
  async findAll() {
    return this.appService.findAll();
  }

  @Get('/')
  @UseGuards(AuthGuard())
  async adminData(@Req() req: Request, @Res() res: Response) {
    this.appService.adminData(req, res);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async delete(@Param() params, @Res() res: Response): Promise<AdminUser[]> {
    return this.appService.delete(params, res);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async editData(@Body(new ValidationPipe()) edit: EditAdmindata, @Param() params, @Req() req: Request, @Res() res: Response): Promise<AdminUser[]> {
    return this.appService.editData(params, req, res);
  }
}
