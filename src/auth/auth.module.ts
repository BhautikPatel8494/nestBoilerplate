import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtDeviceStrategy } from './jwt-device.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import { DeviceAuthController } from '../device/v1/auth/auth.controller';
import { AuthController } from '../api/v1/auth/auth.controller';
import { UserSchema } from '../model/user.model';
import { AdminUserSchema } from '../model/adminuser.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'AdminUser', schema: AdminUserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_MINUTES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, DeviceAuthController],
  providers: [AuthService, JwtStrategy, JwtDeviceStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule { }
