import { Injectable } from '@nestjs/common';
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
    try{
      const course = await this.courseModel.findById(id);
      if (!course) {
        throw new Error('Course not found');
      }
    return course;
    } catch (error) {
      throw new Error('Failed to retrieve course');
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      const courses = await this.courseModel.find();
      if (courses.length === 0) {
        throw new Error('No courses found');
      }
      return courses;
    } catch (error) {
      throw new Error('Failed to retrieve courses');
    }
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { name, year, educationalLevel: educationalLevelString } = createCourseDto;
    const educationalLevel = EducationalLevel[
      educationalLevelString as keyof typeof EducationalLevel
    ];

    if (!name || !year || !educationalLevel) {
      throw new Error('Missing required fields');
    }

    const validationPreBasic = ['1°', '2°'];
    const validationBasic = ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°'];
    const validationMedia = ['1°', '2°', '3°', '4°'];
    if (
      educationalLevel === EducationalLevel.PRE_BASICA &&
      !validationPreBasic.includes(name)
    ) {
      throw new Error('Invalid course name for pre-basic educational level');
    }
    if (
      educationalLevel === EducationalLevel.BASICA &&
      !validationBasic.includes(name)
    ) {
      throw new Error('Invalid course name for basic educational level');
    }
    if (
      educationalLevel === EducationalLevel.MEDIA &&
      !validationMedia.includes(name)
    ) {
      throw new Error('Invalid course name for media educational level');
    }

    const currentYear = new Date().getFullYear();
    if (year < currentYear) {
      throw new Error('Year must be the current year');
    }

    const course: Course = {
      name,
      educationalLevel,
      year,
    };

    try{
      const createdCourse = new this.courseModel(course);
      return createdCourse.save();
    } catch (error) {
      throw new Error('Failed to create course');
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    try {
      const existingCourse = await this.courseModel
        .findByIdAndUpdate(id, updateCourseDto, { new: true });
  
      if (!existingCourse) {
        throw new Error('Course not found');
      }
      return existingCourse;
    } catch (error) {
      throw new Error('Failed to update course');
    }
  }
}
