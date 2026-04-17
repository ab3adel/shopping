import { Test, TestingModule } from '@nestjs/testing';
import { GaymentServiceController } from './gayment-service.controller';
import { GaymentServiceService } from './gayment-service.service';

describe('GaymentServiceController', () => {
  let gaymentServiceController: GaymentServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GaymentServiceController],
      providers: [GaymentServiceService],
    }).compile();

    gaymentServiceController = app.get<GaymentServiceController>(GaymentServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gaymentServiceController.getHello()).toBe('Hello World!');
    });
  });
});
