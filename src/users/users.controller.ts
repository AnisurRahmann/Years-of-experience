import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWorkExperienceDto } from './dto/createWorkExperience.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateWorkExperienceDto } from './dto/updateWorkExperience.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUser(@Param('id') id: string) {
    const user = this.usersService.getUser(id);
    return user;
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateUserDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Post(':id/workExperience')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateWorkExperienceDto })
  async createWorkExperience(
    @Param('id') id: string,
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
  ) {
    return this.usersService.createWorkExperience(id, createWorkExperienceDto);
  }

  @Patch(':id/:workExperienceId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UpdateWorkExperienceDto })
  async updateWorkExperience(
    @Param('id') id: string,
    @Param('workExperienceId') workExperienceId: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
  ) {
    return this.usersService.updateWorkExperience(
      id,
      workExperienceId,
      updateWorkExperienceDto,
    );
  }

  @Delete(':id/:workExperienceId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteWorkExperience(
    @Param('id') id: string,
    @Param('workExperienceId') workExperienceId: string,
  ) {
    return this.usersService.deleteWorkExperience(id, workExperienceId);
  }
}
