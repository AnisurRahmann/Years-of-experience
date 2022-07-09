import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { RegistrationDto } from './dto/registration.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(registrationDto: RegistrationDto) {
    const userInDb = await this.prisma.user.findUnique({
      where: { email: registrationDto.email },
    });

    if (userInDb) {
      throw new ConflictException(
        `User with email ${registrationDto.email} already exists`,
      );
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...registrationDto,
        password: await hash(registrationDto.password, 10),
      },
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: this.jwtService.sign({ userId: newUser.id }),
    };
  }

  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
