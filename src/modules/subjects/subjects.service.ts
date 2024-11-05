import { Inject, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './schemas/subject.schema';
import { CoursesService } from '../courses/courses.service';
import { Block } from './schemas/block.schema';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel:Model<Subject>,
    @InjectModel(Block.name) private blockModel:Model<Block>,
    @Inject() private coursesService: CoursesService,
  ){}

  async create(createSubjectDto: CreateSubjectDto) {
    const { name, educationalLevel, schedule, teacher, course } = createSubjectDto;

    const courseExists = await this.coursesService.findById(course);
    if (!courseExists) {
      throw new Error('Curso no encontrado.');
    }

    const blockExists = await this.findBlocks(schedule);
    if (!blockExists) {
      throw new Error('Bloque(s) no encontrado(s).');
    }

    //TODO: comprobar que el profesor existe (axios)

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

  async getBlocks() {
    return this.blockModel.find();
  }

  async findBlocks(ids: string[]) {
    const blocks = await this.blockModel.find({ _id: { $in: ids } });
    return blocks.length === ids.length;
  }
}
