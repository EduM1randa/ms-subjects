import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './schemas/subject.schema';
import { CoursesService } from '../courses/courses.service';
import { InscriptionsService } from '../inscriptions/inscriptions.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SchedulesService } from '../schedules/schedules.service';
import { Schedule } from '../schedules/schemas/schedule.schema';
import { EducationalLevel } from 'src/common/enum/educational-level.enum';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @Inject() private scheduleService: SchedulesService,
    @Inject() private coursesService: CoursesService,
    @Inject() private inscriptionsService: InscriptionsService,
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const { name, schedule, teacherId, courseId, isElective } =
      createSubjectDto;
    const teacher = new Types.ObjectId(teacherId);
    const course = new Types.ObjectId(courseId);

    if (!name) throw new BadRequestException('Nombre es requerido.');
    if (!schedule || schedule.length === 0)
      throw new BadRequestException('Horario es requerido.');
    if (!teacher) throw new BadRequestException('Profesor es requerido.');
    if (!course) throw new BadRequestException('Curso es requerido.');
    if (isElective === null)
      throw new BadRequestException('Electivo es requerido.');

    const courseExists = await this.coursesService.findById(course.toString());
    if (!courseExists) {
      throw new NotFoundException('Curso no encontrado.');
    }

    const shceduleExist = await this.scheduleService.findSchedules(schedule);
    if (!shceduleExist) {
      throw new NotFoundException('Horarios(s) no encontrado(s).');
    }

    const schedulesAvailable = await this.getAvailableSchedules(
      course.toString(),
    );
    if (
      (schedule || []).some(
        (id) => !schedulesAvailable.find((s) => s._id?.toString() === id),
      )
    ) {
      throw new BadRequestException('Horarios no disponibles para el curso.');
    }

    const existingSubject = await this.subjectModel
      .findOne({ name, courseId })
      .exec();
    if (existingSubject) {
      throw new BadRequestException(
        `La asignatura ${name} ya está creada para el curso dado.`,
      );
    }

    const existTeacher = await lastValueFrom(
      this.usersService.send({ cmd: 'get-teacher-by-id' }, teacherId),
    );
    if (!existTeacher) throw new NotFoundException('Profesor no encontrado.');

    if(isElective && courseExists.educationalLevel !== EducationalLevel.MEDIA) {
      throw new BadRequestException('Los electivos solo pueden ser asignados a cursos de media.');
    }

    const subject: Subject = {
      name,
      schedule: schedule.map((id) => new Types.ObjectId(id)),
      teacherId: teacher,
      courseId: courseExists._id,
      isElective,
    };

    try {
      const createdSubject = new this.subjectModel(subject);
      return createdSubject.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al crear materia.');
    }
  }

  async findById(id: string): Promise<Subject> {
    try {
      const subject = await this.subjectModel.findById(id);
      if (!subject) {
        throw new NotFoundException('Materia no encontrada.');
      }
      return subject;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener materia.');
    }
  }

  async findSubjectsByCourse(courseId: string): Promise<Subject[]> {
    try {
      const subjects = await this.subjectModel.find({ courseId });
      if (subjects.length === 0) {
        throw new NotFoundException('No se encontraron materias.');
      }
      return subjects;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener materias.');
    }
  }

  async findSubjectsByStudent(
    studentId: string,
    year: number,
  ): Promise<Subject[]> {
    try {
      const inscription = await this.inscriptionsService.findByStudent(
        studentId,
        year,
      );

      if (!inscription) {
        throw new NotFoundException('Inscripción no encontrada.');
      }

      const subjects = await this.subjectModel.find({
        courseId: inscription.courseId,
      });

      if (subjects.length === 0) {
        throw new NotFoundException('No se encontraron materias inscritas.');
      }

      return subjects;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener materias.');
    }
  }

  async findSubjectsByTeacher(
    teacherId: string,
    year: number,
  ): Promise<Subject[]> {
    try {
      const subjects = await this.subjectModel.find({ teacherId });
      const filteredSubjects = subjects.filter(async (subject) => {
        const course = await this.coursesService.findById(
          subject.courseId?.toString() || '',
        );
        return course.year === year;
      });

      if (filteredSubjects.length === 0) {
        throw new NotFoundException('No se encontraron materias asignadas.');
      }
      return filteredSubjects;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener materias.');
    }
  }

  async update(
    id: string,
    updateSubjectDto: CreateSubjectDto,
  ): Promise<Subject> {
    try {
      const updatedSubject = await this.subjectModel.findByIdAndUpdate(
        id,
        updateSubjectDto,
        { new: true },
      );
      if (!updatedSubject) {
        throw new NotFoundException('Materia no encontrada.');
      }
      return updatedSubject;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar materia.');
    }
  }

  async getAvailableSchedules(courseId: string): Promise<Schedule[]> {
    const subjects = await this.subjectModel
      .find({ courseId })
      .populate('schedule')
      .exec();
    const occupiedSchedules = new Set<string>();

    subjects.forEach((subject) => {
      subject.schedule?.forEach((schedule) => {
        occupiedSchedules.add(schedule.toString());
      });
    });

    const allSchedules = await this.scheduleService.getSchedules();

    const availableSchedules = allSchedules.filter(
      (schedule) => !occupiedSchedules.has(schedule._id?.toString() || ''),
    );

    return availableSchedules;
  }
}
