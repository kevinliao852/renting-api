import { Test, TestingModule } from '@nestjs/testing';
import { RentsController } from './rents.controller';

describe('RentsController', () => {
  let controller: RentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentsController],
    }).compile();

    controller = module.get<RentsController>(RentsController);
  });

  it('creat a rent', () => {
    expect(controller.creatRent({ scooterId: 1 })).toEqual({ rent_id: 1 });
  });
});
