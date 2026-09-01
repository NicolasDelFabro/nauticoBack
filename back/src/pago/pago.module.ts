import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from '../pago/entities/pago.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Pago])],
    exports: [TypeOrmModule],
})

export class PagoModule {}