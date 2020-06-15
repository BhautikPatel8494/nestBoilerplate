import { IsString, IsNotEmpty, Allow, IsIn, IsOptional } from 'class-validator';
export class User {
  @IsString()
  firstName: string;
  @IsString()
  lastName?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class EditUserData {
  @IsString()
  @IsOptional()
  public readonly firstName?: string;
  @IsString()
  @IsOptional()
  public readonly lastName?: string;
}
