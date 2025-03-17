import { Controller, Get } from '@nestjs/common';
import { RallyService } from './rally.service';
import { Observable } from 'rxjs';
import { Rally } from './rally.model';

@Controller('rally')
export class RallyController {
  constructor(private rallyService: RallyService) {}

  @Get()
  get(): Observable<Rally[]> {
    return this.rallyService.getRallies();
  }
}
