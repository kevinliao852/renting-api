import { Test, TestingModule } from '@nestjs/testing';
import { ScootersController } from './scooters.controller';
import { ScooterStatus } from './scooter.entity';
import { ScootersService } from './scooters.service';

describe('ScootersController', () => {
  let controller: ScootersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScootersController],
      providers: [
        ScootersService,
        {
          provide: 'ScooterRepository',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ScootersController>(ScootersController);
  });

  it('get available scooters', async () => {
    jest
      .spyOn(controller, 'getScooters')
      .mockImplementation(() => Promise.resolve([]));
    expect(await controller.getScooters(ScooterStatus.Available)).toHaveLength(
      0,
    );
  });
});
