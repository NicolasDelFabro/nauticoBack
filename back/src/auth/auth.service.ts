import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Users } from "../users/entities/user.entity"
import { LoginDto } from "./dto/login-user.dto";
import { EmailService } from "../emails/email.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
      ) {}

      async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: {
                dni: loginDto.dni,
            },
        });

        if(!user) {
            throw new UnauthorizedException('Credenciales inválidas')
        }
        
        const passwordValidate = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if(!passwordValidate) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = {
            sub: user.id,
            dni: user.dni,
            rol: user.rol,
        };

        const token = this.jwtService.sign(payload);

        const { password, ...userWithoutPassword } = user;

        return {
            access_token: token,
            mustChangePassword: user.mustChangePassword,
            user: userWithoutPassword
        };
      }

      async solicitarCodigo(dni: number, email: string) {
        const user = await this.userRepository.findOne({ where: { dni } });

        if (!user || user.email !== email) {
          return {
            message: 'Si los datos son correctos, vas a recibir un email con instrucciones.',
          };
        }

        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        const expiracion = new Date(Date.now() + 15 * 60 * 1000);

        user.verificationCode = codigo;
        user.verificationCodeExpiresAt = expiracion;
        await this.userRepository.save(user);

        await this.emailService.enviarCodigoVerificacion(user.email, codigo);

        return {
          message: 'Si los datos son correctos, vas a recibir un email con instrucciones.',
        };
      }

      async cambiarPassword(dni: number, codigo: string, nuevaPassword: string) {
        const user = await this.userRepository.findOne({ where: { dni } });

        if (!user || !user.verificationCode || !user.verificationCodeExpiresAt) {
          throw new BadRequestException('Código inválido o vencido');
        }

        if (user.verificationCode !== codigo) {
          throw new BadRequestException('Código inválido o vencido');
        }

        if (user.verificationCodeExpiresAt < new Date()) {
          throw new BadRequestException('Código inválido o vencido');
        }

        user.password = await bcrypt.hash(nuevaPassword, 10);
        user.mustChangePassword = false;
        user.verificationCode = null;
        user.verificationCodeExpiresAt = null;

        await this.userRepository.save(user);

        return { message: 'Contraseña actualizada correctamente' };
      }
}