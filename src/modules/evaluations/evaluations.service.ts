import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
    const {
      subjectId: subjectIdString,
      description,
      totalScore,
      date,
    } = createEvaluationDto;

    const subjectId = new this.evaluationModel.base.Types.ObjectId(
      subjectIdString,
    );

    if (!subjectId)
      throw new BadRequestException('Subject is required or invalid');
    if (!description) throw new BadRequestException('Description is required');
    if (!totalScore) throw new BadRequestException('Total score is required');
    if (!date) throw new BadRequestException('Date is required');

    if (!(await this.subjectsService.findById(subjectId.toString()))) {
      throw new NotFoundException('Subject not found');
    }

    if (await this.findEvaluation(subjectId.toString(), date)) {
      throw new NotFoundException('Evaluation already exists in this date');
    }

    if (totalScore <= 0)
      throw new BadRequestException('Total score must be greater than 0');
    if (new Date(date) < new Date())
      throw new BadRequestException('Date must be greater than today');

    const evaluation: Evaluation = {
      subjectId,
      description,
      totalScore,
      date,
    };

    try {
      const createdEvaluation = new this.evaluationModel(evaluation);
      return createdEvaluation.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating evaluation');
    }
  }

  async findEvaluation(subject: string, date: Date): Promise<Boolean> {
    const exist = await this.evaluationModel.findOne({
      subjectId: subject,
      date,
    });
    if (exist) return true;
    return false;
  }

  async findById(id: string): Promise<Evaluation> {
    try {
      const evaluaion = await this.evaluationModel.findById(id);
      if (!evaluaion) {
        throw new NotFoundException('Evaluation not found');
      }
      return evaluaion;
    } catch (error) {
      throw new InternalServerErrorException('Error getting evaluation');
    }
  }

  async findAll(): Promise<Evaluation[]> {
    try {
      const evaluations = await this.evaluationModel.find();
      if (!evaluations) {
        throw new NotFoundException('Evaluations not found');
      }
      return evaluations;
    } catch (error) {
      throw new InternalServerErrorException('Error getting evaluations');
    }
  }

  async update(
    id: string,
    updateEvaluationDto: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    try {
      const existingEvaluation = await this.evaluationModel.findByIdAndUpdate(
        id,
        updateEvaluationDto,
        { new: true },
      );
      if (!existingEvaluation) {
        throw new NotFoundException('Evaluation not found');
      }
      return existingEvaluation;
    } catch (error) {
      throw new InternalServerErrorException('Error updating evaluation');
    }
  }

  async findBySubject(subjectId: string): Promise<Evaluation[]> {
    try {
      const evaluations = await this.evaluationModel.find({ subjectId });
      if (!evaluations) {
        throw new NotFoundException('Evaluations not found');
      }
      return evaluations;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting evaluations by subject',
      );
    }
  }
}
