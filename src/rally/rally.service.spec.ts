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
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(rallies)
        })
      } as any);
    });

    it('should return Rallies and augment diffMin field', (done) => {
      service.getRallies().subscribe({
        next: (rallies: Rally[]) => {
          expect(rallies.length).toBe(5);
          rallies.forEach((rally: Rally) => {
            expect(rally).toHaveProperty('diffMin');
          });
        },
        error: (error) => console.log(error),
        complete: done(),
      });
    });
  });

  describe('getRalliesWithinBounds', () => {
    beforeEach(() => {
      jest.spyOn(model, 'find').mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(rallies)
        })
      } as any);
    });

    it('should return Rallies within supplied bounds and augment diffMin field', (done) => {
      service.getRalliesWithinPolygon(
        [
          [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
          [100.0, 1.0], [100.0, 0.0]
        ]
      ).subscribe({
        next: (rallies: Rally[]) => {
          expect(model.find).toHaveBeenCalledWith(
            expect.objectContaining({
              "location": {
                "$geoWithin": {
                  "$geometry": {
                    "coordinates": [
                      [
                        [100, 0], [101, 0], [101, 1], [100, 1], [100, 0]
                      ]
                    ], "type": "Polygon"
                  }
                }
              }
            })
          );
          expect(rallies.length).toBe(5);
          rallies.forEach((rally: Rally) => {
            expect(rally).toHaveProperty('diffMin');
          });
        },
        error: (error) => console.log(error),
        complete: done(),
      });
    });
  });
});
