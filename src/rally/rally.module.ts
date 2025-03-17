import { Module } from '@nestjs/common';
import { RallyService } from './rally.service';
import { RallySchema } from './rally.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RallyController } from './rally.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'rallies',
        schema: RallySchema,
      },
    ]),
  ],
  providers: [RallyService],
  controllers: [RallyController],
})
export class RallyModule {}
