import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNumber()
    @IsNotEmpty()
    dni: number

    @IsString()
    @IsNotEmpty()
    password: string;
}