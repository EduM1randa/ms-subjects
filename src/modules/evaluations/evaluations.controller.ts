import { Controller } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Evaluation } from './schemas/evaluation.schema';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @MessagePattern({ cmd: 'create-evaluation' })
  async create(
    @Payload() createEvaluationDto: CreateEvaluationDto,
  ): Promise<Evaluation> {
    return await this.evaluationsService.create(createEvaluationDto);
  }

  @MessagePattern({ cmd: 'update-evaluation' })
  async update(
    @Payload() data: { id: string; updateEvaluationDto: UpdateEvaluationDto },
  ): Promise<Evaluation> {
    const { id, updateEvaluationDto } = data;
    return await this.evaluationsService.update(id, updateEvaluationDto);
  }

  @MessagePattern({ cmd: 'get-all-evaluations' })
  async findAll(): Promise<Evaluation[]> {
    return await this.evaluationsService.findAll();
  }

  @MessagePattern({ cmd: 'get-evaluation-by-id' })
  async findOne(@Payload() id: string): Promise<Evaluation> {
    return await this.evaluationsService.findById(id);
  }

  @MessagePattern({ cmd: 'find-evaluations-by-subject' })
  async findBySubject(@Payload() subjectId: string): Promise<Evaluation[]> {
    return await this.evaluationsService.findBySubject(subjectId);
  }
}
