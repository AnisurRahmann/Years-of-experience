import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RenderInterceptor } from '../render.interceptor';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    { provide: APP_INTERCEPTOR, useClass: RenderInterceptor },
  ],
})
export class ProfilesModule {}
