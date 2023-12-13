import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AtGuard } from './common/guards';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 1919;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const reflector = new Reflector();
  app.useGlobalGuards(new AtGuard(reflector))
  console.log('Running on port : ' ,port)
  await app.listen(port);
}
bootstrap();
