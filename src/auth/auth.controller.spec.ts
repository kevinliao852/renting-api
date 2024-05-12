import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        JwtService,
        AuthService,
        {
          provide: 'UserRepository',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('signIn', async () => {
    jest.spyOn(controller, 'login').mockImplementation(() =>
      Promise.resolve({
        access_token: 'token',
      }),
    );
    expect(
      await controller.login({
        username: 'bob',
        password: 'password',
      }),
    ).toHaveProperty('access_token');
  });
});
