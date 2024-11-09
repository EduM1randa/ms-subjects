import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { BlockSchema } from './schemas/block.schema';
import { CoursesModule } from '../courses/courses.module';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Subject.name,
      schema: SubjectSchema
    }]),
    MongooseModule.forFeature([{
      name: 'Block',
      schema: BlockSchema
    }]),
    CoursesModule,
    InscriptionsModule,
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {}
