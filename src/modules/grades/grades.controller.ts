import { Controller } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Grade } from './schemas/grade.schema';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @MessagePattern({ cmd: 'create_grade' })
  async create(
    @Payload() createGradeDto: CreateGradeDto
  ): Promise<Grade> {
    return await this.gradesService.create(createGradeDto);
  }

  @MessagePattern({ cmd: 'get_all_grades' })
  async findAll(): Promise<Grade[]> {
    return await this.gradesService.findAll();
  }

  @MessagePattern({ cmd: 'get_grade_by_id' })
  async findByStudent(@Payload() studentId: string): Promise<Grade[]> {
    return await this.gradesService.findByStudent(studentId);
  }

  @MessagePattern({ cmd: 'update_grade' })
  async update(
    @Payload() data: { id: string, updateGradeDto: UpdateGradeDto }
  ): Promise<Grade> {
    const { id, updateGradeDto } = data;
    return await this.gradesService.update(id, updateGradeDto);
  }
}
