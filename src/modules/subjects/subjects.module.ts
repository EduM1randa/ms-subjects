import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { CoursesModule } from '../courses/courses.module';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';
import { UsersModule } from 'src/common/connections/users.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Subject.name,
      schema: SubjectSchema
    }]),
    CoursesModule,
    InscriptionsModule,
    UsersModule,
    SchedulesModule,
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {}
