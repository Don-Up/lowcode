// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto'; // Assume this exists

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByEmail(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) { // In production, use proper password hashing!
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: CreateUserDto) {
    const payload = { name: user.name, sub: user.email };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: CreateUserDto) {
    const createdUser = await this.userService.createUser(user);
    const payload = { name: createdUser.name, sub: createdUser.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}