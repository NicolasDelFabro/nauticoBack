import { IsBoolean } from "class-validator";

export class CreateUserDto {
  @IsBoolean()
  active: boolean 
}