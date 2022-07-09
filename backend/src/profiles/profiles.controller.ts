import { Controller, Get, Param, SetMetadata } from '@nestjs/common';

import { ProfilesService } from './profiles.service';

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}
  @Get()
  @SetMetadata('FILE_NAME', 'user.hbs')
  async gethello(): Promise<any> {
    return { message: 'Hello Love!' };
  }
  @Get('/:id')
  @SetMetadata('FILE_NAME', 'user.hbs')
  async getPublicUserProfile(@Param('id') id: string): Promise<any> {
    return this.profilesService.getPublicUserProfile(id);
  }
}
