import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StuffController } from './stuff/stuff.controller';
import { StuffService } from './stuff/stuff.service';

@Module({
  imports: [],
  controllers: [AppController, StuffController],
  providers: [AppService, StuffService],
})
export class AppModule {}
