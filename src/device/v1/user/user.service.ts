import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class UserService {
  constructor(@InjectModel('User')
  private readonly userModel: Model<User>,
              private readonly authService: AuthService) { }

  async userData(req, res) {
    const adminInformation = await this.userModel.findOne({ _id: req.user._id });
    return res.json(adminInformation);
  }

  async editData(req, res) {
    await this.userModel.updateOne({ _id: req.user._id }, req.body);
    return res.json({ message: 'Record updated sucsesfully' });
  }
}
