import { Test, TestingModule } from '@nestjs/testing';
import { LowCodeController } from './low-code.controller';
import { LowCodeService } from './low-code.service';

describe('LowCodeController', () => {
  let controller: LowCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LowCodeController],
      providers: [LowCodeService],
    }).compile();

    controller = module.get<LowCodeController>(LowCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
