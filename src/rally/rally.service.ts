import { Injectable } from '@nestjs/common';
import { Rally } from './rally.model';
import { from, Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RallyService {
  constructor(@InjectModel('rallies') private rallyModel: Model<Rally>) {}

  getRallies(): Observable<Rally[]> {
    return from(this.rallyModel.find({}).exec());
  }
}
