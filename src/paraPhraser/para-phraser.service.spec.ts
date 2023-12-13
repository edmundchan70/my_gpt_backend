import { Test, TestingModule } from '@nestjs/testing';
import { ParaPhraserService } from './para-phraser.service';

describe('ParaPhraserService', () => {
  let service: ParaPhraserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParaPhraserService],
    }).compile();

    service = module.get<ParaPhraserService>(ParaPhraserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
