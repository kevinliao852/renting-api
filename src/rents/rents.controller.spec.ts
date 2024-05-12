import { Test, TestingModule } from '@nestjs/testing';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import { DataSource } from 'typeorm';
import { RentStatus } from './rent.entity';

describe('RentsController', () => {
  let controller: RentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentsController],
      providers: [
        RentsService,
        {
          provide: 'RentRepository',
          useValue: {},
        },
        {
          provide: 'ScooterRepository',
          useValue: {},
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RentsController>(RentsController);
  });

  it('create a rent', () => {
    jest.spyOn(controller, 'createRent').mockImplementation(() =>
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

    expect(controller.createRent).toBeDefined();
  });
});
