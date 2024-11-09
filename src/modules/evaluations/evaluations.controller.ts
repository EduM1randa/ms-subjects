import { Controller } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Evaluation } from './schemas/evaluation.schema';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @MessagePattern({ cmd: 'create_evaluation' })
  async create(
    @Payload() createEvaluationDto: CreateEvaluationDto
  ): Promise<Evaluation> {
    return await this.evaluationsService.create(createEvaluationDto);
  }

  @MessagePattern({ cmd: 'update_evaluation' })
  async update(
    @Payload() data: { id: string, updateEvaluationDto: UpdateEvaluationDto }
  ): Promise<Evaluation> {
    const { id, updateEvaluationDto } = data;
    return await this.evaluationsService.update(id, updateEvaluationDto);
  }

  @MessagePattern({ cmd: 'get_all_evaluations' })
  async findAll(): Promise<Evaluation[]> {
    return await this.evaluationsService.findAll();
  }

  @MessagePattern({ cmd: 'get_evaluation_by_id' })
  async findOne(@Payload() id: string): Promise<Evaluation> {
    return await this.evaluationsService.findById(id);
  }

  @MessagePattern({ cmd: 'find_evaluations_by_subject' })
  async findBySubject(@Payload() subjectId: string): Promise<Evaluation[]> {
    return await this.evaluationsService.findBySubject(subjectId);
  }
}
