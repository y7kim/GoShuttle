import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RallyModule } from './rally/rally.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/goShuttle'),
    RallyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
