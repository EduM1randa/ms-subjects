import { Controller } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Inscription } from './schemas/inscription.schema';

@Controller('inscriptions')
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  @MessagePattern({ cmd: 'create_inscription' })
  async create(
    @Payload() createInscriptionDto: CreateInscriptionDto
  ): Promise<Inscription> {
    return await this.inscriptionsService.create(createInscriptionDto);
  }

  @MessagePattern({ cmd: 'get_all_inscriptions' })
  async findAll(): Promise<Inscription[]> {
    return await this.inscriptionsService.findAll();
  }

  @MessagePattern({ cmd: 'get_inscription_by_student_and_course' })
  async findInscription(
    @Payload() data: { studentId: string, courseId: string }
  ): Promise<Inscription | null> {
    const { studentId, courseId } = data;
    return await this.inscriptionsService.findInscription(studentId, courseId);
  }

  @MessagePattern({ cmd: 'update_inscription' })
  async update(
    @Payload() data: { id: string, updateInscriptionDto: UpdateInscriptionDto }
  ): Promise<Inscription> {
    const { id, updateInscriptionDto } = data;
    return await this.inscriptionsService.update(id, updateInscriptionDto);
  }
}
