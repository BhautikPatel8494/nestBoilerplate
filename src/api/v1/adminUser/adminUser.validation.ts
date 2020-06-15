import { IsString, IsNotEmpty, Allow, IsEmail, IsOptional } from 'class-validator';
export class EditAdmindata {
  @IsString()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
