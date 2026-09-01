import { Injectable, ConflictException } from '@nestjs/common';
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

    return this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserByName(name: string) {
    return this.userRepository.find({ where: { name } });
  }

  async getUserByDni(dni: number) {
    return this.userRepository.findOne({ where: { dni } });
  }
}