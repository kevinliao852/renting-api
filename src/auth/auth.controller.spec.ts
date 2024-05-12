import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [UsersModule, AuthModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('signIn', async () => {
    expect(
      await controller.login({
        username: 'bob',
        password: 'password',
      }),
    ).toHaveProperty('access_token');
  });
});
