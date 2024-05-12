import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { ScooterStatus } from './scooter.entity';

@Controller('scooters')
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) {}

  @Get('')
  getScooters(@Query('status') status: ScooterStatus) {
    try {
      return this.scootersService.findByStatus(status);
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
