import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeSchema } from './schemas/grade.schema';
import { EvaluationsModule } from '../evaluations/evaluations.module';
import { UsersModule } from 'src/common/connections/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: 'Grade', 
      schema: GradeSchema 
    }]),
    EvaluationsModule,
    UsersModule,
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
