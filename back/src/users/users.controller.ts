import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from "@nestjs/passport"
import { ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

 @Get()
  getUserByDni(@Query('dni') dni?: number) {
    if (dni) {
      return this.usersService.getUserByDni(dni);
    }
    return this.usersService.getAllUsers();
  }

  @Get()
    getUserByName(@Query('name') name?: string) {
      if(name) {
        return this.usersService.getUserByName(name);
      }
      return this.usersService.getAllUsers();
    }
    
  @Patch(':id/active')
    changeStatus(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.changeStatus(id);
    }
}
