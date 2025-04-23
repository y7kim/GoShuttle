import { Body, Controller, Get, Headers, Post, ValidationPipe } from '@nestjs/common';
import { RallyService } from './rally.service';
import { Observable } from 'rxjs';
import { Rally } from './rally.model';
import { CreateRallyDto } from './create-rally.dto';

@Controller('rally')
export class RallyController {
  constructor(private rallyService: RallyService) {}

  @Get()
  getRallies(): Observable<Rally[]> {
    return this.rallyService.getRallies();
  }

  @Post()
  saveRally(@Body() data: CreateRallyDto): Observable<Rally>{
    return this.rallyService.saveRally(data);
  }
}

@Controller('search')
export class SearchController {
  constructor(private rallyService: RallyService) {}

  @Post()
  getRalliesWithinBounds(@Body() polygon: Array<number[]>): Observable<Rally[]> {
    return this.rallyService.getRalliesWithinPolygon(polygon);
  }
}