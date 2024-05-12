import { Test, TestingModule } from '@nestjs/testing';
import { RentsService } from './rents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Scooter } from '../scooters/scooter.entity';
import { Rent, RentStatus } from './rent.entity';
import { DataSource } from 'typeorm';
describe('RentsService', () => {
  let service: RentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentsService,
        {
          provide: getRepositoryToken(Rent),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Scooter),
          useValue: {},
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RentsService>(RentsService);
  });

  it('createRent', () => {
    jest.spyOn(service, 'createRent').mockImplementation(() =>
      Promise.resolve({
        rentId: 1,
        startTime: new Date(),
        endTime: null,
        userId: 1,
        scooterId: 1,
        rentalStatus: RentStatus.OnGoing,
        scooter: null,
        user: null,
      }),
    );

    expect(service).toBeDefined();
  });
});
