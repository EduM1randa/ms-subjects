import { Inject, Injectable } from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inscription } from './schemas/inscription.schema';
import { SubjectsService } from '../subjects/subjects.service';

@Injectable()
export class InscriptionsService {
  constructor (
    @InjectModel(Inscription.name) private inscriptionModel: Model<Inscription>,
    @Inject() private subjectsService: SubjectsService,
  ) {}

  async create(createInscriptionDto: CreateInscriptionDto) {
    const { student, subject } = createInscriptionDto;
    
    // TODO buscar estudiante (rabbitmq)

    if(!await this.subjectsService.findById(subject)) {
      throw new Error('Subject not found');
    }

    if(await this.findInscription(student, subject)) {
      throw new Error('Inscription already exists');
    }
    
    const inscription = {
      student,
      subject,
    }

    const createdInscription = new this.inscriptionModel(inscription);
    return createdInscription.save();
  }

  async findInscription(student: string, subject: string): Promise<Boolean> {
    const exist = await this.inscriptionModel.findOne({ student, subject });
    if(exist) return true;
    return false;
  }

  // async findAll() {
  //   return `This action returns all inscriptions`;
  // }

  // async findOne(id: number) {
  //   return `This action returns a #${id} inscription`;
  // }

  // async update(id: number, updateInscriptionDto: UpdateInscriptionDto) {
  //   return `This action updates a #${id} inscription`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} inscription`;
  // }
}
