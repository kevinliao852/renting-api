import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent, RentStatus } from './rent.entity';
import { DataSource, Repository } from 'typeorm';
import { Scooter, ScooterStatus } from '../scooters/scooter.entity';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent)
    private rentsRepository: Repository<Rent>,
    @InjectRepository(Scooter)
    private scootersRepository: Repository<Scooter>,

    private dataSource: DataSource,
  ) {}

  async createRent(rentData: { scooterId: number; userId: number }) {
    return await this.dataSource.transaction(async (manager) => {
      const scooters = await this.scootersRepository.find({
        where: {
          scooterId: rentData.scooterId,
          status: ScooterStatus.Available,
        },
      });

      const scooter = scooters[0];

      if (!scooter) {
        throw new Error('Scooter not found');
      }

      const rent = this.rentsRepository.create({
        startTime: new Date(),
        userId: rentData.userId,
        scooterId: rentData.scooterId,
        rentalStatus: RentStatus.OnGoing,
      });

      scooter.status = ScooterStatus.Rented;
      await manager.save(scooter);
      return await manager.save(rent);
    });
  }
}
