import { JwtService } from '@nestjs/jwt';
import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../device/v1/user/user.interface';
import { AdminUser } from '../api/v1/adminUser/adminUser.interface';
import { SendOtpResponse } from './interfaces/auth.responses.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('AdminUser') private readonly adminUserModel: Model<AdminUser>,
  ) { }

  // facebook login for device
  async facebookLogin(payload): Promise<SendOtpResponse> {
    const token = await this.jwtService.sign(payload);
    await this.userModel.create(payload);
    return { message: 'Login with facebook successfully', dStatus: HttpStatus.OK, data: [{ token }] };
  }

  // Create User
  async createUser(req) {
    const saltRounds = 10;
    req.password = await bcrypt.hash(req.password, saltRounds);
    const payload = {
      email: req.email,
    };
    const token = await this.jwtService.sign(payload);
    await this.userModel.create(req);
    return { message: 'Created user successfully', dStatus: HttpStatus.OK, data: [{ token }] };
  }

  // login User
  async loginUser(req, res) {
    const user = await this.userModel.findOne({ email: req.email });
    if (user) {
      const comparePassword = await bcrypt.compare(req.password, user.password);
      if (comparePassword) {
        const payload = {
          email: user.email,
        };
        const jwt: string = this.jwtService.sign(payload);
        return res.json({ token: jwt, user: user.email });
      } else {
        return res.json({ message: 'Invalid password' });
      }
    } else {
      return res.json({ message: 'Invalid Email' });
    }
  }

  // Create AdminUser
  async addAdminUser(file, req, res) {
    if (file) {
      req.image = file.filename;
    }
    const saltRounds = 10;
    req.password = await bcrypt.hash(req.password, saltRounds);
    const payload = {
      firstName: req.firstName,
      lastName: req.lastName,
    };
    const jwt: string = this.jwtService.sign(payload);
    const createdPost = await this.adminUserModel.create(req);
    return res.json({ token: jwt, user: createdPost });
  }

  // login AdminUser
  async login(req, res, next) {
    const adminUser = await this.adminUserModel.findOne({ email: req.body.email });
    if (adminUser) {
      const comparePassword = await bcrypt.compare(req.body.password, adminUser.password);
      if (comparePassword) {
        const payload = {
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
        };
        const jwt: string = this.jwtService.sign(payload);
        return res.json({ token: jwt, user: req.body.email });
      } else {
        return res.json({ message: 'Invalid password' });
      }
    } else {
      return res.json({ message: 'Invalid Email' });
    }
  }

  async validateUser(payload, type: string): Promise<any> {
    if (type === 'admin') {
      const adminUser = await this.adminUserModel.findOne({ firstName: payload.firstName, lastName: payload.lastName });
      return adminUser;
    } else {
      const user = await this.userModel.findOne({ email: payload.email });
      return user;
    }
  }
}
