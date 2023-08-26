import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT_SERVER = process.env.PORT_SERVER || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT_SERVER);
  console.log('##############################');
  console.log(`Server is running on port ${PORT_SERVER}`);
  console.log('##############################');
}
bootstrap();
