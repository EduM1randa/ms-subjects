import { Controller } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Course } from './schemas/course.schema';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern({ cmd: 'create-course' })
  async create(@Payload() createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.coursesService.create(createCourseDto);
  }

  @MessagePattern({ cmd: "get-all-courses" })
  async findAll(): Promise<Course[]> {
    return await this.coursesService.findAll();
  }

  @MessagePattern({ cmd: 'get-course-by-id' })
  async findOne(@Payload() id: string): Promise<Course> {

    console.log('id', id);
    
    return await this.coursesService.findById(id);
  }

  @MessagePattern({ cmd: 'update-course' })
  async update(
    @Payload() data: { id: string, updateCourseDto: UpdateCourseDto }
  ): Promise<Course> {
    const { id, updateCourseDto } = data;
    return await this.coursesService.update(id, updateCourseDto);
  }
}