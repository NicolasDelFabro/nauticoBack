import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from "./entities/user.entity"
import { withLatestFrom } from 'rxjs';

@Injectable()
export class UsersService{
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    console.log("Usuario creado y guardado: ", user)
    return this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find()
  }

  async getUserByName(name: string) {
    return this.userRepository.find({
      where: {
        name: name
      }
    })
  }

  async updateStatus() {
    
  }
}
