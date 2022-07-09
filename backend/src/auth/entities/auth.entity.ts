import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  constructor(partial: Partial<Auth>) {
    Object.assign(this, partial);
    // short for
    // this.id = partial.id;
  }
}
