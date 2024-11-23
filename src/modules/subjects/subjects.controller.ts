import { Controller } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Subject } from './schemas/subject.schema';
import { Schedule } from '../schedules/schemas/schedule.schema';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @MessagePattern({ cmd: 'create-subject' })
  async create(
    @Payload() createSubjectDto: CreateSubjectDto,
  ): Promise<Subject> {
    return await this.subjectsService.create(createSubjectDto);
  }

  @MessagePattern({ cmd: 'get-subject-by-id' })
  async findOne(@Payload() id: string): Promise<Subject> {
    return await this.subjectsService.findById(id);
  }

  @MessagePattern({ cmd: 'get-subjects-by-course' })
  async findByCourse(@Payload() courseId: string): Promise<Subject[]> {
    return await this.subjectsService.findSubjectsByCourse(courseId);
  }

  @MessagePattern({ cmd: 'get-subjects-by-student' })
  async findByStudent(
    @Payload() data: { studentId: string; year: number },
  ): Promise<Subject[]> {
    const { studentId, year } = data;
    return await this.subjectsService.findSubjectsByStudent(studentId, year);
  }

  @MessagePattern({ cmd: 'get-subjects-by-teacher' })
  async findByTeacher(
    @Payload() data: { teacherId: string; year: number },
  ): Promise<Subject[]> {
    const { teacherId, year } = data;
    return await this.subjectsService.findSubjectsByTeacher(teacherId, year);
  }

  @MessagePattern({ cmd: 'update-subject' })
  async update(
    @Payload() data: { id: string; updateSubjectDto: UpdateSubjectDto },
  ): Promise<Subject> {
    const { id, updateSubjectDto } = data;
    return await this.subjectsService.update(id, updateSubjectDto);
  }

  @MessagePattern({ cmd: 'get-available-shcedules' })
  async getAvailableSchedules(
    @Payload() data: { courseId: string },
  ): Promise<Schedule[]> {
    const { courseId } = data;
    return await this.subjectsService.getAvailableSchedules(courseId);
  }

  @MessagePattern({ cmd: 'get-subjects' })
  async findAll(): Promise<Subject[]> {
    return await this.subjectsService.findAll();
  }

  @MessagePattern({ cmd: 'get-subject-schedules' })
  async getSubjectSchedule(@Payload() id: string): Promise<Schedule[]> {
    return await this.subjectsService.getSubjectSchedule(id);
  }

}
