import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Grade } from './schemas/grade.schema';
import { EvaluationsService } from '../evaluations/evaluations.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name) private gradeModel: Model<Grade>,
    @Inject() private evaluationsService: EvaluationsService,
    @Inject('USERS_SERVICE') private usersService: ClientProxy,
  ) {}

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const {
      evaluationId: evaluationIdString,
      studentId,
      score,
      grade,
    } = createGradeDto;
    const evaluationId = new this.gradeModel.base.Types.ObjectId(
      evaluationIdString,
    );

    if (!evaluationId)
      throw new BadRequestException('EvaluationId is required or invalid');
    if (!studentId) throw new BadRequestException('StudentId is required');
    if (!score) throw new BadRequestException('Score is required');
    if (!grade) throw new BadRequestException('Grade is required');

    const existStudent = await lastValueFrom(
      this.usersService.send('get-student', studentId),
    );
    if (!existStudent) throw new NotFoundException('Student not found');

    if (!(await this.evaluationsService.findById(evaluationId.toString()))) {
      throw new NotFoundException('Evaluation not found');
    }

    if (score < 0)
      throw new BadRequestException('Score must be greater than 0');

    if (grade < 1 || grade > 7) {
      throw new BadRequestException('Grade must be between 1 and 7');
    }

    const newGrade: Grade = {
      evaluationId,
      studentId: new Types.ObjectId(studentId),
      score,
      grade,
    };

    try {
      const createdGrade = new this.gradeModel(newGrade);
      return await createdGrade.save();
    } catch (error) {
      throw new InternalServerErrorException('Student not found');
    }
  }

  async findAll(): Promise<Grade[]> {
    try {
      const grades = await this.gradeModel.find();
      if (grades.length === 0) throw new NotFoundException('No grades found');
      return grades;
    } catch (error) {
      throw new InternalServerErrorException('Error getting grades');
    }
  }

  async findByStudent(studentId: string): Promise<Grade[]> {
    try {
      const grades = await this.gradeModel.find({ studentId });
      if (grades.length === 0) throw new NotFoundException('No grades found');
      return grades;
    } catch (error) {
      throw new InternalServerErrorException('Error getting grades');
    }
  }

  async update(id: string, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    try {
      const grade: Grade | null = await this.gradeModel.findByIdAndUpdate(
        id,
        updateGradeDto,
        { new: true },
      );
      if (!grade) throw new NotFoundException('Grade not found');
      return grade;
    } catch (error) {
      throw new InternalServerErrorException('Error updating grade');
    }
  }
}
