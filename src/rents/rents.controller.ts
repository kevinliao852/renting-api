import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { scooters } from '../scooters/scooters.controller';

@Controller('rents')
export class RentsController {
  constructor() {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  creatRent(@Body() createRedntDto: Record<string, any>) {
    const scooterIndex = scooters.findIndex(
      ({ scooterId }) => scooterId === createRedntDto.scooterId,
    ) as number | undefined;

    if (scooterIndex === undefined) {
      throw new UnprocessableEntityException('Scooter not found');
    }

    scooters[scooterIndex].status = 'Rented';

    return {
      rent_id: 1,
    };
  }
}
