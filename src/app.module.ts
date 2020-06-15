import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/services/config.service';
import { AuthModule } from './auth/auth.module';
import { AdminUserModule } from './api/v1/adminUser/adminUser.module';
import { UserModule } from './device/v1/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    AdminUserModule,
    UserModule,
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
