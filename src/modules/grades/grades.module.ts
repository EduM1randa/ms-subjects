import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeSchema } from './schemas/grade.schema';
import { EvaluationsModule } from '../evaluations/evaluations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: 'Grade', 
      schema: GradeSchema 
    }]),
    EvaluationsModule,
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
