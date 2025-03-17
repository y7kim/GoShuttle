/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import { Test, TestingModule } from '@nestjs/testing';
import { RallyService } from './rally.service';
import { Rally } from './rally.model';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { rallies } from './mockRallies';

describe('RallyService', () => {
  let service: RallyService;
  let model: Model<Rally>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RallyService,
        {
          provide: getModelToken('rallies'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RallyService>(RallyService);
    model = module.get<Model<Rally>>(getModelToken('rallies'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRallies', () => {
    beforeEach(() => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(rallies) as any,
      } as any);
    });

    it('should return all Rallies', (done) => {
      service.getRallies().subscribe({
        next: (rallies) => expect(rallies.length).toBe(4),
        error: (error) => console.log(error),
        complete: done(),
      });
    });
  });
});
