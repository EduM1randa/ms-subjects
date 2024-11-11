import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Inscription } from './schemas/inscription.schema';
import { CoursesService } from '../courses/courses.service';
import { InscriptionStatus } from 'src/common/enum/inscription-status.enum';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InscriptionsService {
  constructor(
    @InjectModel(Inscription.name) private inscriptionModel: Model<Inscription>,
    @Inject() private coursesService: CoursesService,
    @Inject('USERS_SERVICE') private usersService: ClientProxy,
  ) {}

  async create(
    createInscriptionDto: CreateInscriptionDto,
  ): Promise<Inscription> {
    const { studentId, courseId, date, status } = createInscriptionDto;
    const student = new Types.ObjectId(studentId);
    const course = new Types.ObjectId(courseId);
    if (!student) throw new BadRequestException('Student is required');
    if (!course) throw new BadRequestException('course is required');
    if (!date) throw new BadRequestException('Date is required');
    if (!status) throw new BadRequestException('Status is required');

    const existStudent = await lastValueFrom(
      this.usersService.send('get-student', studentId),
    );
    if (!existStudent) throw new NotFoundException('Student not found');

    if (!(await this.coursesService.findById(course.toString()))) {
      throw new NotFoundException('Subject not found');
    }

    if (await this.findInscription(student.toString(), course.toString())) {
      throw new BadRequestException('Inscription already exists');
    }

    if (new Date(date) < new Date())
      throw new BadRequestException('Date must be greater than');
    if (!Object.values(InscriptionStatus).includes(status))
      throw new BadRequestException('Invalid status');

    const inscription: Inscription = {
      studentId: student,
      courseId: course,
      createAt: date,
      status,
    };

    try {
      const createdInscription = new this.inscriptionModel(inscription);
      return createdInscription.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating inscription');
    }
  }

  async findInscription(
    student: string,
    course: string,
  ): Promise<Inscription | null> {
    const exist = await this.inscriptionModel.findOne({
      studentId: student,
      courseId: course,
    });
    return exist;
  }

  async findAll(): Promise<Inscription[]> {
    try {
      const inscriptions = await this.inscriptionModel.find();
      if (inscriptions.length === 0)
        throw new NotFoundException('Inscriptions not found');
      return inscriptions;
    } catch (error) {
      throw new InternalServerErrorException('Error getting inscriptions');
    }
  }

  async update(
    id: string,
    updateInscriptionDto: UpdateInscriptionDto,
  ): Promise<Inscription> {
    try {
      const updatedInscription = await this.inscriptionModel.findByIdAndUpdate(
        id,
        updateInscriptionDto,
        { new: true },
      );
      if (!updatedInscription)
        throw new NotFoundException('Inscription not found');
      return updatedInscription;
    } catch (error) {
      throw new InternalServerErrorException('Error updating inscription');
    }
  }

  async findByStudent(studentId: string, year: number): Promise<Inscription> {
    const activeInscription = await this.inscriptionModel.findOne({
      studentId,
      createAt: year,
      status: InscriptionStatus.ACTIVE,
    });
    if (!activeInscription)
      throw new NotFoundException('Inscription not found');
    return activeInscription;
  }
}
