import { Test, TestingModule } from '@nestjs/testing';
import { ScootersService } from './scooters.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Scooter, ScooterStatus } from './scooter.entity';

describe('ScootersService', () => {
  let service: ScootersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScootersService,
        {
          provide: getRepositoryToken(Scooter),
          useValue: {
            find: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    service = module.get<ScootersService>(ScootersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all available scooters', async () => {
    expect(await service.findByStatus(ScooterStatus.Available)).toEqual([]);
  });
});
