import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
constructor(
  private prisma: PrismaService,
  private jwtService: JwtService,
) {}
 async register(data: RegisterDto) {
  const existingUser = await this.prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return this.prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
    },
  });
}
async login(data: LoginDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password,
  );

  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = this.jwtService.sign({
    id: user.id,
    email: user.email,
  });

  return {
    access_token: token,
  };
}
}