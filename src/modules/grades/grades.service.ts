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
import { Average } from './schemas/average.schema';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name) private readonly gradeModel: Model<Grade>,
    @InjectModel(Average.name) private readonly averageModel: Model<Average>,
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
    if (score === undefined || score === null) throw new BadRequestException('Score is required');
    if (grade === undefined || grade === null) throw new BadRequestException('Grade is required');

    const existStudent = await lastValueFrom(
      this.usersService.send({ cmd: 'get-student' }, studentId),
    );
    if (!existStudent) throw new NotFoundException('Student not found');

    const evaluation = await this.evaluationsService.findById(
      evaluationId.toString(),
    );
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }
    if (!evaluation.subjectId) {
      throw new NotFoundException('Subject not found');
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
      await this.getAverageByStudentAndSubject(
        studentId,
        evaluation.subjectId.toString(),
      );
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
      const grades = await this.gradeModel.find({
        studentId: new Types.ObjectId(studentId),
      });
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
      if (!grade.studentId || !grade.evaluationId) {
        throw new BadRequestException(
          'StudentId and EvaluationId are required',
        );
      }
      const evaluation = await this.evaluationsService.findById(
        grade.evaluationId.toString(),
      );
      if (!evaluation.subjectId)
        throw new NotFoundException('Subject not found');
      await this.getAverageByStudentAndSubject(
        grade.studentId.toString(),
        evaluation.subjectId.toString(),
      );
      return grade;
    } catch (error) {
      throw new InternalServerErrorException('Error updating grade');
    }
  }

  async getGradesByStudentAndEvaluations(
    studentId: string,
    evaluationIds: Types.ObjectId[],
  ): Promise<Grade[]> {
    return this.gradeModel.find({
      studentId: new Types.ObjectId(studentId),
      evaluationId: { $in: evaluationIds },
    });
  }

  async getAverageByStudentAndSubject(
    studentId: string,
    subjectId: string,
  ): Promise<number> {
    const evaluationIds =
      await this.evaluationsService.getEvaluationIdsBySubject(subjectId);
    const grades = await this.getGradesByStudentAndEvaluations(
      studentId,
      evaluationIds,
    );

    if (grades.length === 0) {
      throw new NotFoundException(
        'No grades found for this student and subject',
      );
    }

    const total = grades.reduce((sum, grade) => sum + (grade.grade ?? 0), 0);
    const average = total / grades.length;

    await this.averageModel.updateOne(
      {
        studentId: new Types.ObjectId(studentId),
        subjectId: new Types.ObjectId(subjectId),
      },
      { $set: { average } },
      { upsert: true },
    );

    return average;
  }

  async findByEvaluation(evaluationId: string): Promise<Grade[]> {
    try {
      const grades = await this.gradeModel.find({
        evaluationId: new Types.ObjectId(evaluationId),
      });
        if (grades.length === 0) throw new NotFoundException('No grades found');
        return grades;
      } catch (error) {
        throw new InternalServerErrorException('Error getting grades');
    }
  }
}
