import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RallyModule } from './rally/rally.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // Vue client
      // rootPath: join(__dirname, '..', 'client/dist'),

      // React client
      rootPath: join(__dirname, '..', 'frontend', 'build'),
    }),
    MongooseModule.forRoot('mongodb://localhost/goShuttle'),
    RallyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
