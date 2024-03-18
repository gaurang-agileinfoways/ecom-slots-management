import { Test, TestingModule } from '@nestjs/testing';
import { SlotDetailsController } from './slot-details.controller';
import { SlotDetailsService } from './slot-details.service';

describe('SlotDetailsController', () => {
  let controller: SlotDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotDetailsController],
      providers: [SlotDetailsService],
    }).compile();

    controller = module.get<SlotDetailsController>(SlotDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
