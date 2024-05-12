import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signup') signup() {
    // TODO: Implement signup
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout() {
    // TODO: Implement logout
  }

  @UseGuards(AuthGuard)
  @Post('token')
  token() {
    // TODO: Implement token
  }
}
