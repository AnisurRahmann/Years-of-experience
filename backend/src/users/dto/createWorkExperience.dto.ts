import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkExperienceDto {
  @ApiProperty()
  company: string;

  @ApiProperty()
  job_title: string;

  @ApiProperty()
  job_description: string;

  @ApiProperty()
  company_logo_url: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  is_current: boolean;

  @ApiProperty()
  is_public: boolean;
}
