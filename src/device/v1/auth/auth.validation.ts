import { IsString } from 'class-validator';

// tslint:disable-next-line: max-classes-per-file
export class FacebookLogin {
  @IsString()
  // tslint:disable-next-line: variable-name
  fb_id: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CreateUser {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class LoginUser {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
