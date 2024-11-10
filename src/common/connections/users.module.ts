import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URI ||''],
          queue: process.env.MS_SUBJECTS_QUEUE, 
          queueOptions: {
            durable: false
          }
        }
      }
    ]),
  ],
  providers: [],
  controllers: [],
  exports: [ClientsModule],
})
export class UsersModule {}