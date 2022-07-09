import { ApiProperty } from '@nestjs/swagger';

export class RegistrationEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  constructor(partial: Partial<RegistrationEntity>) {
    Object.assign(this, partial);
    // short for
    // this.id = partial.id;
  }
}
