import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './schemas/subject.schema';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel:Model<Subject>
  ){}

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = new this.subjectModel(createSubjectDto);
    return subject.save();
  }

  // findAll() {
  //   return `This action returns all subjects`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} subject`;
  // }

  // update(id: number, updateSubjectDto: UpdateSubjectDto) {
  //   return `This action updates a #${id} subject`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} subject`;
  // }
}
