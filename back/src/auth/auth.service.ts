import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Users } from "../users/entities/user.entity"
import { LoginDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly jwtService: JwtService,
      ) {}

      async login(loginDto: LoginDto) {
        console.log("JWT SECRET:", process.env.JWT_SECRET);
        const user = await this.userRepository.findOne({
            where: {
                dni: loginDto.dni,
            },
        });

        if(!user) {
            throw new UnauthorizedException('Credenciales inválidas dni')
        }
        
        const passwordValidate = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        console.log("Password recibido: ", loginDto.password);
        console.log("Password BDD: ", user.password);
        console.log("Password hasheada: ", passwordValidate);

        if(!passwordValidate) {
            throw new UnauthorizedException('Credenciales inválidas password');
        }

        const payload = {
            sub: user.id,
            dni: user.dni,
            rol: user.rol,
        };

        console.log("Antes de sign: ", process.env.JWT_SECRET);
        const token = this.jwtService.sign(payload);
        console.log("TOKEN: ", token);

        return {
            access_token: token
        };
      }
}