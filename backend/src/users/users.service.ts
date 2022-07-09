import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkExperienceDto } from './dto/createWorkExperience.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateWorkExperienceDto } from './dto/updateWorkExperience.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        work_experience: true,
      },
    });
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }

    return await this.prisma.user.update({
      data: {
        ...updateUserDto,
      },
      where: {
        id,
      },
    });
  }

  async createWorkExperience(
    id: string,
    createWorkExperienceDto: CreateWorkExperienceDto,
  ) {
    return await this.prisma.workExperience.create({
      data: {
        ...createWorkExperienceDto,
        user: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async updateWorkExperience(
    id: string,
    workExperienceId: string,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
  ) {
    await this.prisma.workExperience.update({
      data: {
        ...updateWorkExperienceDto,
      },
      where: {
        id: workExperienceId,
      },
    });
    const allWorkExperiencesOfUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        work_experience: true,
      },
    });

    return allWorkExperiencesOfUser.work_experience;
  }

  async deleteWorkExperience(id: string, workExperienceId: string) {
    await this.prisma.workExperience.delete({
      where: {
        id: workExperienceId,
      },
    });
    const allWorkExperiencesOfUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        work_experience: true,
      },
    });

    return allWorkExperiencesOfUser.work_experience;
  }
}
