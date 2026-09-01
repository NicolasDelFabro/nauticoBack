import { IsNumber, IsPositive, IsString, Matches } from 'class-validator';

export class createPagoDto{
    @IsNumber()
    @IsPositive()
    socioId: number;

    @IsNumber()
    @IsPositive()
    monto: number;

    @IsString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, {
    message: 'periodo debe tener el formato YYYY-MM, ej: 2026-08',
  })
  periodo: string;
}