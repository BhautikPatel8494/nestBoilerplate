import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserController } from './adminUser.controller';
import { AdminUserService } from './adminUser.service';
import { AdminUserSchema } from '../../../model/adminuser.model';
import { AuthModule } from '../../../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'AdminUser', schema: AdminUserSchema }]),
        AuthModule,
    ],
    controllers: [AdminUserController],
    providers: [AdminUserService],
})

export class AdminUserModule { }
