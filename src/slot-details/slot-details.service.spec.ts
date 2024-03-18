import { Test, TestingModule } from '@nestjs/testing';
import { SlotDetailsService } from './slot-details.service';

describe('SlotDetailsService', () => {
  let service: SlotDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotDetailsService],
    }).compile();

    service = module.get<SlotDetailsService>(SlotDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
