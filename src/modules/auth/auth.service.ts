import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly configServce: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    try {
      const hashPassword = await bcrypt.hash(
        signUpDto.password,
        +this.configServce.get('HASH_PEPPER'),
      );
      const user = await this.usersService.create({
        ...signUpDto,
        password: hashPassword,
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validatePassword(
      signInDto.email,
      signInDto.password,
    );
    const payload = { email: user.email, name: user.name, sub: user._id };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async validatePassword(email: string, password: string) {
    const user = await this.usersService.findByOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    throw new UnauthorizedException('Email or password is incorrect');
  }
}
