import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import { Scooter } from '../scooters/scooter.entity';
import { Rent } from './rent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, Scooter, DataSource])],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
