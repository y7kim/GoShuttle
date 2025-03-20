import { Body, Controller, Get, Post } from '@nestjs/common';
import { RallyService } from './rally.service';
import { Observable } from 'rxjs';
import { Rally } from './rally.model';

@Controller('rally')
export class RallyController {
  constructor(private rallyService: RallyService) {}

  @Get()
  getRallies(): Observable<Rally[]> {
    return this.rallyService.getRallies();
  }

  @Post()
  getRalliesWithinBounds(@Body() polygon: Array<number[]>): Observable<Rally[]> {
    return this.rallyService.getRalliesWithinPolygon(polygon);
  }
}
