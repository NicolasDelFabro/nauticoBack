import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Users } from "src/users/entities/user.entity";

@Module({
    imports: [
        ConfigModule,

        TypeOrmModule.forFeature([Users]),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: "1h",
                },
            }),
        }),
    ],

    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}