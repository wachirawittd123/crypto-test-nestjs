import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SettingService } from './common/setting';
import { ConfigService } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SettingService.config;
  ConfigService.configureMiddleware(app);
  await app.listen(SettingService.PORT);
}
bootstrap();
