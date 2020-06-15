import { Model } from 'mongoose';
import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminUser } from './adminUser.interface';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel('AdminUser') private readonly adminUserModel: Model<AdminUser>,
    private readonly authService: AuthService) { }

  async findAll() {
    return await this.adminUserModel.find();
  }

  async adminData(req, res) {
    const adminInformation = await this.adminUserModel.findOne({ _id: req.user._id });
    return res.json(adminInformation);
  }

  async delete(params, res) {
    await this.adminUserModel.deleteOne({ _id: params.id });
    return res.json({ message: 'Record deleted sucsesfully' });
  }

  async editData(params, req, res) {
    await this.adminUserModel.updateOne({ _id: params.id }, req.body);
    return res.json({ message: 'Record updated sucsesfully' });
  }
}
