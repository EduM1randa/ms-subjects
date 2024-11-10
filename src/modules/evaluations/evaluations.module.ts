import { Module } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsController } from './evaluations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsModule } from '../subjects/subjects.module';
import { EvaluationSchema } from './schemas/evaluation.schema';
import { UsersModule } from 'src/common/connections/users.module';

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
  exports: [EvaluationsService],
})
export class EvaluationsModule {}
