import { Test, TestingModule } from '@nestjs/testing';
import { SlotsBuyerController } from './slots-buyer.controller';
import { SlotsBuyerService } from './slots-buyer.service';

describe('SlotsBuyerController', () => {
  let controller: SlotsBuyerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotsBuyerController],
      providers: [SlotsBuyerService],
    }).compile();

    controller = module.get<SlotsBuyerController>(SlotsBuyerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
