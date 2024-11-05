import { Inject, Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evaluation } from './schemas/evaluation.schema';
import { SubjectsService } from '../subjects/subjects.service';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(Evaluation.name) private evaluationModel: Model<Evaluation>,
    @Inject() private subjectsService: SubjectsService,
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto) {
    const { 
      student, subject, grade, description, 
      totalScore, obtainedScore, date 
    } = createEvaluationDto;

    // TODO buscar estudiante (rabbitmq)

    if(!await this.subjectsService.findById(subject)) {
      throw new Error('Subject not found');
    }

    if(await this.findEvaluation(student, subject, date)) {
      throw new Error('Evaluation already exists');
    }

    const evaluation = {
      student, subject, grade, description,
      totalScore, obtainedScore, date,
    }

    const createdEvaluation = new this.evaluationModel(evaluation);
    return createdEvaluation.save();

  }

  async findEvaluation(student: string, subject: string, date: Date): Promise<Boolean> {
    const exist = await this.evaluationModel.findOne({ student, subject, date });
    if(exist) return true;
    return false;
  }

  // findAll() {
  //   return `This action returns all evaluations`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} evaluation`;
  // }

  // update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
  //   return `This action updates a #${id} evaluation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} evaluation`;
  // }
}
