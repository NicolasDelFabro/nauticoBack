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
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsNumber()
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsEmail()
  email:  string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['socio', 'tesorero', 'presidente', 'admin'])
  rol: string
}