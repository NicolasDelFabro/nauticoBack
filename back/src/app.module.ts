import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserModule } from './users/users.module';
import { PagoModule } from './pago/pago.module';

@Module({
  imports: [
    // 1. Carga las variables de entorno del archivo .env a nivel global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Conecta TypeORM usando la URL del .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // <-- AQUÍ SE USA LA VARIABLE
        autoLoadEntities: true,
        synchronize: true, // Sincroniza las entidades automáticamente (solo usar en desarrollo)
        namingStrategy: new SnakeNamingStrategy(),
        ssl: {
          rejectUnauthorized: false, // Requerido para la conexión SSL de Neonw
        },
      }),
    }),

    // 3. Tus módulos
    UserModule,
    PagoModule,
  ],
})
export class AppModule {}