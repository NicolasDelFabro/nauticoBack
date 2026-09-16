import { IsNumber, IsString, IsNotEmpty, MinLength, Length } from "class-validator";

export class CambiarPasswordDto {
    @IsNumber()
    dni: number;

    @IsString()
    @Length(6, 6)
    codigo: string;

    @IsString()
    @MinLength(6)
    nuevaPassword: string;
}