import { Test, TestingModule } from '@nestjs/testing';
import { LowCodeService } from './low-code.service';

describe('LowCodeService', () => {
  let service: LowCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LowCodeService],
    }).compile();

    service = module.get<LowCodeService>(LowCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
