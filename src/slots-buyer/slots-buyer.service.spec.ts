import { Test, TestingModule } from '@nestjs/testing';
import { SlotsBuyerService } from './slots-buyer.service';

describe('SlotsBuyerService', () => {
  let service: SlotsBuyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotsBuyerService],
    }).compile();

    service = module.get<SlotsBuyerService>(SlotsBuyerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
