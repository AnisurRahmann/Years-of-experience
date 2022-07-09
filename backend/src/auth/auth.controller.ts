import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse , ApiTags} from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';
import { RegistrationDto } from './dto/registration.dto';
import { RegistrationEntity } from './entities/registration.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse({ type: RegistrationEntity })
  async register(@Body() registrationDto: RegistrationDto) {
    return new RegistrationEntity(
      await this.authService.register(registrationDto),
    );
  }
}
