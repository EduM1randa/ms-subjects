import { Controller } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Inscription } from './schemas/inscription.schema';

@Controller('inscriptions')
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  @MessagePattern({ cmd: 'create-inscription' })
  async create(
    @Payload() createInscriptionDto: CreateInscriptionDto,
  ): Promise<Inscription | null> {
    return await this.inscriptionsService.create(createInscriptionDto);
  }

  @MessagePattern({ cmd: 'get-all-inscriptions' })
  async findAll(): Promise<Inscription[]> {
    return await this.inscriptionsService.findAll();
  }

  @MessagePattern({ cmd: 'get-inscription-by-student-and-course' })
  async findInscription(
    @Payload() data: { studentId: string; courseId: string },
  ): Promise<Inscription | null> {
    const { studentId, courseId } = data;
    return await this.inscriptionsService.findInscriptionByCourse(
      studentId,
      courseId,
    );
  }

  @MessagePattern({ cmd: 'update-inscription' })
  async update(
    @Payload() data: { id: string; updateInscriptionDto: UpdateInscriptionDto },
  ): Promise<Inscription> {
    const { id, updateInscriptionDto } = data;
    return await this.inscriptionsService.update(id, updateInscriptionDto);
  }

  @MessagePattern({ cmd: "get-students-by-course" })
  async getStudentsByCourse(
    @Payload() courseId: string,
  ) {
    return await this.inscriptionsService.getStudentsByCourse(courseId);
  }
}
