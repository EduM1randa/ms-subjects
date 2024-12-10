import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from './schemas/grade.schema';
import { EvaluationsModule } from '../evaluations/evaluations.module';
import { UsersModule } from 'src/common/connections/users.module';
import { Average, AverageSchema } from './schemas/average.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Grade.name, 
        schema: GradeSchema 
      },
      {
        name: Average.name,
        schema: AverageSchema,
      }
    ]),
    EvaluationsModule,
    UsersModule,
  ],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService],
})
export class GradesModule {}
