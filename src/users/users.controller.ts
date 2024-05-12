import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @Get('/:user_id/rents')
  getUserRents() {}
}
