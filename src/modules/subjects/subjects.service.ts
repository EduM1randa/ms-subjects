import { Inject, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './schemas/subject.schema';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel:Model<Subject>,
    @Inject() private coursesService: CoursesService,
  ){}

  async create(createSubjectDto: CreateSubjectDto) {
    const { name, educationalLevel, schedule, teacher, course } = createSubjectDto;

    const courseExists = await this.coursesService.findById(course);
    if (!courseExists) {
      throw new Error('Course not found');
    }

    //TODO: comprobar que el profesor existe

    const subject = {
      name,
      educationalLevel,
      schedule,
      teacher,
      course: courseExists._id,
    }
    
    const createdSubject = new this.subjectModel(subject);

    return createdSubject.save();
  }
}
