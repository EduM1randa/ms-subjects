import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';
import { EducationalLevel } from 'src/common/enum/educational-level.enum';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async findById(id: string): Promise<Course> {
    try {
      const course = await this.courseModel.findById(id);
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      return course;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve course');
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      const courses = await this.courseModel.find();
      if (courses.length === 0) {
        throw new NotFoundException('No courses found');
      }
      return courses;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve courses');
    }
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const {
      name,
      year,
      educationalLevel,
      letter,
    } = createCourseDto;

    if (!name || !year || !educationalLevel || !letter) {
      throw new NotFoundException('Missing required fields');
    }

    const validationPreBasic = ['1°', '2°'];
    const validationBasic = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°'];
    const validationMedia = ['1°', '2°', '3°', '4°'];
    if (
      educationalLevel === EducationalLevel.PRE_BASICA &&
      !validationPreBasic.includes(name)
    ) {
      throw new NotFoundException('Invalid course name for Pre-Basica');
    }
    if (
      educationalLevel === EducationalLevel.BASICA &&
      !validationBasic.includes(name)
    ) {
      throw new NotFoundException('Invalid course name for Basica');
    }
    if (
      educationalLevel === EducationalLevel.MEDIA &&
      !validationMedia.includes(name)
    ) {
      throw new NotFoundException('Invalid course name for Media');
    }

    try {
      const course = new this.courseModel({
        name,
        year,
        educationalLevel,
        letter,
      });
      return await course.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create course');
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    try {
      const updatedCourse = await this.courseModel
        .findByIdAndUpdate(id, updateCourseDto, { new: true })
        .exec();
      if (!updatedCourse) {
        throw new NotFoundException('Course not found');
      }
      return updatedCourse;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update course');
    }
  }
}
