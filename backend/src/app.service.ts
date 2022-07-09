import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): any {
    return { message: 'Hello Love!' };
  }

  async getPublicUserProfile(id): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { work_experience: true },
    });

    console.log(user);
    return user;
  }
}
