import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Optional()
  password: string;
}