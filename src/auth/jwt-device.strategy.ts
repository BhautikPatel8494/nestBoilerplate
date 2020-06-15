import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/services/config.service';

@Injectable()
export class JwtDeviceStrategy extends PassportStrategy(Strategy, 'jwt-device') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    ) {
      super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload, 'device');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
