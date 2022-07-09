import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  async getPublicUserProfile(id): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { work_experience: true },
    });

    return {
      ...user,
      work_experience: user.work_experience.map((item) => ({
        ...item,
        start_date: item.start_date?.toLocaleDateString(),
        end_date: item.end_date?.toLocaleDateString(),
      })),
    };
  }
}
