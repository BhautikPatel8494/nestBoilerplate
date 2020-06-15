import { Document } from 'mongoose';

export interface AdminUser extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
}
