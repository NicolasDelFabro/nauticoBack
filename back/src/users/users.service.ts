import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
/* CREAR USUARIO NUEVO */
  async create(createUserDto: CreateUserDto) {
    const existente = await this.userRepository.findOne({
      where: { dni: createUserDto.dni },
    });
    if (existente) {
      throw new ConflictException('Ya existe un usuario con ese DNI');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: passwordHash,
    });

    const guardado = await this.userRepository.save(user);
    const { password, ...resto } = guardado;
    
    return resto;
  }
/* TRAER TODOS LOS USUARIOS */
  async getAllUsers() {
    return this.userRepository.find();
  }

/* TRAER USUARIO POR NOMBRE */
  async getUserByName(name: string) {
    return this.userRepository.find({ where: { name } });
  }

/* TRAER USUARIO POR DNI */
  async getUserByDni(dni: number) {
    return this.userRepository.findOne({ where: { dni } });
  }

/* TRAER USUARIO POR DNI */
  async getUserById(id: number) {
  return this.userRepository.findOne({ where: { id } });
}

/* CAMBIAR ESTATUS DEL USUARIO */
async changeStatus(id: number) {
  const user = await this.userRepository.findOne({
    where: { id },
  });

  if (!user) {
    throw new NotFoundException('No se ha podido encontrar el usuario');
  }

  user.active = !user.active;

  return await this.userRepository.save(user);
}
}