import { IsNumber, IsEmail } from "class-validator";

export class SolicitarCodigoDto {
    
    @IsNumber()
    dni: number;

    @IsEmail()
    email: string;
}