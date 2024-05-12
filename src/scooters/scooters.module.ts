import { Module } from '@nestjs/common';
import { ScootersController } from './scooters.controller';
import { ScootersService } from './scooters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from './scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  providers: [ScootersService],
  controllers: [ScootersController],
})
export class ScootersModule {}
