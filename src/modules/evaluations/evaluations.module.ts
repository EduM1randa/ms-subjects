import { Module } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsController } from './evaluations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsModule } from '../subjects/subjects.module';
import { EvaluationSchema } from './schemas/evaluation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Evaluation',
      schema: EvaluationSchema,
    }]),
    SubjectsModule,
  ],
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
})
export class EvaluationsModule {}
