import { Test, TestingModule } from '@nestjs/testing';
import { RallyController } from './rally.controller';
import { RallyService } from './rally.service';
import { of } from 'rxjs';
import { rallies } from './mockRallies';

describe('RallyController', () => {
  let controller: RallyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RallyController],
      providers: [
        {
          provide: RallyService,
          useValue: {
            getRallies: () => of(rallies),
          },
        },
      ],
    }).compile();

    controller = module.get<RallyController>(RallyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
