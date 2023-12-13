import { Test, TestingModule } from '@nestjs/testing';
import { ParaPhraserController } from './para-phraser.controller';

describe('ParaPhraserController', () => {
  let controller: ParaPhraserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParaPhraserController],
    }).compile();

    controller = module.get<ParaPhraserController>(ParaPhraserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
