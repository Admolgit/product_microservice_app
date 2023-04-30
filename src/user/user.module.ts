import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ProductService } from 'src/product/product.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://xhwrwlvg:1yjIe3pDN-w-M6IVFy30PSYbwvW0bTBp@jackal.rmq.cloudamqp.com/xhwrwlvg'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
