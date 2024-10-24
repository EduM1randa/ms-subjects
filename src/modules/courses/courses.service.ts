import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor (
    @InjectModel(Course.name) private courseModel:Model<Course>,
  ) {}

  async findById(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  async findAll() {
   return await this.courseModel.find();
  }

  async create(createCourseDto: CreateCourseDto) {
    const { name, year } = createCourseDto;
    const course = {
      name,
      year,
    }
    const createdCourse = new this.courseModel(course);
    return createdCourse.save();
  }
}
