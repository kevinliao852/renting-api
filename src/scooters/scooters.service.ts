import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scooter, ScooterStatus } from './scooter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScootersService {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
  ) {}
  findByStatus(status: ScooterStatus) {
    return this.scooterRepository.find({
      where: { status },
    });
  }
}
