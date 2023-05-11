import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://xhwrwlvg:1yjIe3pDN-w-M6IVFy30PSYbwvW0bTBp@jackal.rmq.cloudamqp.com/xhwrwlvg',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
          noAck: false,
          prefetchCount: 1,
        },
      },
    ]),
    UserModule, //imported
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
