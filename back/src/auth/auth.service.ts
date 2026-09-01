// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dni: number, password: string) {
    const usuario = await this.usersService.getUserByDni(dni);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!usuario.active) {
      throw new UnauthorizedException('Este usuario está dado de baja');
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { sub: usuario.id, dni: usuario.dni, rol: usuario.rol };

    return {
      access_token: this.jwtService.sign(payload),
      mustChangePassword: usuario.mustChangePassword,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        dni: usuario.dni,
        rol: usuario.rol,
      },
    };
  }
}