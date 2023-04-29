import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/microservice');
  app.enableCors({
    origin: 'http://localhost:4200'
  })
  await app.listen(8100);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqps://xhwrwlvg:1yjIe3pDN-w-M6IVFy30PSYbwvW0bTBp@jackal.rmq.cloudamqp.com/xhwrwlvg'],
  //     queue: 'main_queue',
  //     queueOptions: {
  //       durable: false
  //     },
  //   },
  // });
  
  // await app.listen();
}
bootstrap();
