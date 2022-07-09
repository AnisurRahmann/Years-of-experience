import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  user_profile_pic: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  public: boolean;
}
