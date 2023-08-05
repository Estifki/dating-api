import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign_up.dto';
import { SignInDto } from './dto/sign_in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpBody: SignUpDto) {
    return this.authService.createUser(signUpBody);
  }

  @Get('/signin')
  async signIn(@Body() signInBody: SignInDto) {
    return this.authService.login(signInBody);
  }
}
