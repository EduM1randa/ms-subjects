import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { BlockSchema } from './schemas/block.schema';
import { CoursesModule } from '../courses/courses.module';

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
    CoursesModule 
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
