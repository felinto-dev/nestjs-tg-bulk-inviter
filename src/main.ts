import { NestFactory } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await CommandFactory.run(AppModule);
  await app.listen(3000);
}
bootstrap();
