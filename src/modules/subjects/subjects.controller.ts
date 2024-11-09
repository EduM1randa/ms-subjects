import { Controller } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Subject } from './schemas/subject.schema';
import { Block } from './schemas/block.schema';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @MessagePattern({ cmd: 'create_subject' })
  async create(
    @Payload() createSubjectDto: CreateSubjectDto
  ): Promise<Subject> {
    return await this.subjectsService.create(createSubjectDto);
  }

  @MessagePattern({ cmd: 'get_blocks' })
  async getBlocks(): Promise<Block[]> {
    return await this.subjectsService.getBlocks();
  }

  @MessagePattern({ cmd: 'get_subject_by_id' })
  async findOne(@Payload() id: string): Promise<Subject> {
    return await this.subjectsService.findById(id);
  }

  @MessagePattern({ cmd: 'get_subjects_by_course' })
  async findByCourse(@Payload() courseId: string): Promise<Subject[]> {
    return await this.subjectsService.findSubjectsByCourse(courseId);
  }

  @MessagePattern({ cmd: 'get_subjects_by_student' })
  async findByStudent(
    @Payload() data: { studentId: string, year: number }
  ): Promise<Subject[]> {
    const { studentId, year } = data;
    return await this.subjectsService.findSubjectsByStudent(studentId, year);
  }

  @MessagePattern({ cmd: 'get_subjects_by_teacher' })
  async findByTeacher(
    @Payload() data: { teacherId: string, year: number }
  ): Promise<Subject[]> {
    const { teacherId, year } = data;
    return await this.subjectsService.findSubjectsByTeacher(teacherId, year);
  }

  @MessagePattern({ cmd: 'update_subject' })
  async update(
    @Payload() data: { id: string, updateSubjectDto: UpdateSubjectDto }
  ): Promise<Subject> {
    const { id, updateSubjectDto } = data;
    return await this.subjectsService.update(id, updateSubjectDto);
  }
}
