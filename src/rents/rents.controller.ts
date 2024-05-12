import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RentsService } from './rents.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  createRent(@Body() createRentDto: Record<string, any>) {
    return this.rentsService.createRent({
      scooterId: createRentDto.scooterId,
      userId: createRentDto.userId,
    });
  }
}
