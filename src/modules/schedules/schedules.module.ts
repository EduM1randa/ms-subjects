import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schemas/block.schema';
import { Schedule, ScheduleSchema } from './schemas/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Block.name, schema: BlockSchema },
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
