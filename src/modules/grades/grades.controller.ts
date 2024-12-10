import { Controller } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Grade } from './schemas/grade.schema';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @MessagePattern({ cmd: 'create-grade' })
  async create(
    @Payload() createGradeDto: CreateGradeDto
  ): Promise<Grade> {
    return await this.gradesService.create(createGradeDto);
  }

  @MessagePattern({ cmd: 'get-all-grades' })
  async findAll(): Promise<Grade[]> {
    return await this.gradesService.findAll();
  }

  @MessagePattern({ cmd: 'get-grade-by-id' })
  async findByStudent(@Payload() studentId: string): Promise<Grade[]> {
    return await this.gradesService.findByStudent(studentId);
  }

  @MessagePattern({ cmd: 'get-grades-by-evaluation' })
  async findByEvaluation(@Payload() evaluationId: string): Promise<Grade[]> {
    return await this.gradesService.findByEvaluation(evaluationId);
  }

  @MessagePattern({ cmd: 'update-grade' })
  async update(
    @Payload() data: { id: string, updateGradeDto: UpdateGradeDto }
  ): Promise<Grade> {
    const { id, updateGradeDto } = data;
    return await this.gradesService.update(id, updateGradeDto);
  }
}
