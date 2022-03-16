import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsNumber()
  countryCode: number;

  @IsString()
  @MinLength(10)
  @MaxLength(18)
  mobileNumber: string;

  @IsString()
  @MinLength(4)
  @MaxLength(100)
  company_name: string;

  @IsOptional()
  createdBy?: number;

  @IsOptional()
  modifiedBy?: number;
}
