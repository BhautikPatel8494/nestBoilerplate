import { IsString, IsNotEmpty } from 'class-validator';

// tslint:disable-next-line: max-classes-per-file
export class VerifyData {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  firstName?: string;
  @IsString()
  @IsNotEmpty()
  lastName?: string;
  @IsNotEmpty()
  password?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class AdminUserLogin {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password?: string;
}
