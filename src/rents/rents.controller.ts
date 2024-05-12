import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RentsService } from './rents.service';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  createRent(@Body() createRentDto: Record<string, any>) {
    return this.rentsService.createRent({
      scooterId: createRentDto.scooterId,
      userId: createRentDto.userId,
    });
  }
}
