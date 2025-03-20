import { Injectable } from '@nestjs/common';
import { Rally } from './rally.model';
import { from, map, Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RallyService {
  constructor(@InjectModel('rallies') private rallyModel: Model<Rally>) { }

  getRallies(): Observable<Rally[]> {
    return from(this.rallyModel.find({}).lean().exec()).pipe(
      map((rallies: Rally[]) => {
        return rallies.map((rally: Rally) => {
          return {
            ...rally,
            diffMin: calculateRallyAge(rally.time)
          } as Rally;
        });
      })
    );
  }

  getRalliesWithinPolygon(polygon: Array<number[]>): Observable<Rally[]> {
    return from(
      this.rallyModel.find({
        location: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates: [polygon]
            }
          }
        }
      }).lean().exec()
    ).pipe(
      map((rallies: Rally[]) => {
        return rallies.map((rally: Rally) => {
          return {
            ...rally,
            diffMin: calculateRallyAge(rally.time)
          } as Rally;
        });
      })
    );
  }
}

function calculateRallyAge(date: Date): number {
  const now = new Date();
  const dateCreated = new Date(date);
  let diff = (now.getTime() - dateCreated.getTime()) / 1000;
  diff /= 60;
  return Math.round(diff);
}