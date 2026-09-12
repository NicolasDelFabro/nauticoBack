import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.access_token || null,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: number; dni: number; rol: string }) {
    const usuario = await this.usersService.getUserById(payload.sub);

    if (!usuario || !usuario.active) {
      throw new UnauthorizedException('Usuario no válido o dado de baja');
    }

    return { id: usuario.id, dni: usuario.dni, rol: usuario.rol };
  }
}