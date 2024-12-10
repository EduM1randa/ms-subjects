import { Inject, Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { pdfReport } from './documents/build.report';
import { SubjectsService } from '../subjects/subjects.service';
import { GradesService } from '../grades/grades.service';
import { ClientProxy } from '@nestjs/microservices';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly subjectService: SubjectsService,
    private readonly gradesService: GradesService,
    private readonly printer: PrinterService,
    private readonly courseService: CoursesService,
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
    @Inject('ATTENDANCE_SERVICE') private readonly attendanceService: ClientProxy,
  ) {}

  async getReport(studentId: string, year: number): Promise<PDFKit.PDFDocument> {

    const docDefinition: Promise<TDocumentDefinitions> = pdfReport(
      studentId,
      year,
      this.subjectService,
      this.gradesService,
      this.courseService,
      this.usersService,
      this.attendanceService,
    );
    
    return this.printer.createPdf(await docDefinition);
  }

}
