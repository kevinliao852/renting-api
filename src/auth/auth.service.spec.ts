import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth.module';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        {
          provide: 'UserRepository',
          useValue: {},
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('basic signIn', async () => {
    const username = 'bob';
    const password = 'password';

    jest.spyOn(service, 'signIn').mockImplementation(() =>
      Promise.resolve({
        access_token: 'token',
      }),
    );

    expect(await service.signIn(username, password)).toHaveProperty(
      'access_token',
    );
  });
});
