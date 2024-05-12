import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
      imports: [UsersModule, AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('basic signIn', async () => {
    const username = 'bob';
    const password = 'password';

    expect(await service.signIn(username, password)).toHaveProperty(
      'access_token',
    );
  });
});
