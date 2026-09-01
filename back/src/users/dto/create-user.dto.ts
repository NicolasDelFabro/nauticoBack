import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  IsIn,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  dni: number;

  @IsString()
  birthdate: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email:  string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['socio', 'tesorero', 'presidente', 'admin'])
  rol: string
}