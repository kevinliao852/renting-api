import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { ScooterStatus } from './scooter.entity';

export const scooters = [
  {
    scooterId: 1,
    firstName: 'John',
    scooterName: 'Scooter 1',
    status: 'Available',
    lastRentedTime: '2021-09-01T00:00:00.000Z',
  },
  {
    scooterId: 2,
    firstName: 'Jane',
    scooterName: 'Scooter 2',
    status: 'Rented',
    lastRentedTime: '2021-09-01T00:00:00.000Z',
  },
  {
    scooterId: 3,
    firstName: 'Jack',
    scooterName: 'Scooter 3',
    status: 'Available',
    lastRentedTime: '2021-09-01T00:00:00.000Z',
  },
];

@Controller('scooters')
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) {}

  @Get('')
  getScooters(@Query('status') status: ScooterStatus) {
    try {
      console.log('status', status);
      return this.scootersService.findByStatus(status);
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
