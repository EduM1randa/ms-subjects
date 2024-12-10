import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ATTENDANCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://lqbucdmb:3YcHZZON5ZD-szJXXfvKX0wCC1YZVkAZ@prawn.rmq.cloudamqp.com/lqbucdmb'],
          queue: 'attendance_queue', 
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
export class AttendanceModule {}