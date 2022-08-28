import { Module, CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      HttpModule,
      CacheModule.register({
        ttl: 120,
      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
