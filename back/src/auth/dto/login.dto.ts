// src/auth/dto/login.dto.ts
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNumber()
  dni: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}