import { Module } from '@nestjs/common';
import { CryptoController } from './controller';
import { CryptoService } from './service';
import { RedisService } from './common/connect-redis';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  controllers: [CryptoController],
  providers: [CryptoService, RedisService],
})
export class AppModule {}
