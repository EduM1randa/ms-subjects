import { NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { lastValueFrom } from 'rxjs';
import { CoursesService } from 'src/modules/courses/courses.service';
import { GradesService } from 'src/modules/grades/grades.service';
import { SubjectsService } from 'src/modules/subjects/subjects.service';

const logo: Content = {
  image: 'src/assets/colegio-icon.png',
  width: 70,
};

const styles: StyleDictionary = {
  h1: {
    fontSize: 19,
    bold: true,
    margin: [0, 10],
  },
  header: {
    italics: true,
    alignment: 'left',
  },
};

export const pdfReport = async (
  studentId: string,
  year: number,
  subjectsService: SubjectsService,
  gradesService: GradesService,
  courseService:CoursesService,
  usersService: ClientProxy,
  attendanceService: ClientProxy,
): Promise<TDocumentDefinitions> => {
  const student = await lastValueFrom(usersService.send({ cmd: 'get-student' }, studentId));
  if(!student) throw new NotFoundException('Estudiante no encontrado.');

  const subjects = await subjectsService.findSubjectsByStudent(studentId, year);
  if(subjects.length === 0) throw new NotFoundException('No se encontraron materias.');
  const courseId = subjects[0].courseId;
  if (!courseId) throw new NotFoundException('No se encontró el curso.');
  const course = await courseService.findById(courseId?.toString());

  const attendance = await lastValueFrom(attendanceService
    .send({ cmd: 'get-attendance-percentage' }, {studentId, courseId}));
  if(!attendance) throw new NotFoundException('Asistencia no encontrada.');

  const tableBody = [
    [{text: 'Asignatura', alignment: 'left'}, {text: 'Nota', alignment: 'right'}],
  ]

  for (const subject of subjects) {
    if (subject._id && subject.name) {
      const average = await gradesService.getAverageByStudentAndSubject(
        studentId, subject._id.toString());
      tableBody.push([{text: subject.name, alignment: 'left'}, {text: average.toFixed(1) || '', alignment: 'right'}]);
    }
  }

  tableBody.push(
    [{
      text: '',
      alignment: ''
    }, {
      text: '',
      alignment: ''
    }],
    [{ text: '% Asistencia: ', alignment: 'right' }, 
      { text: `${attendance}%`, alignment: 'right' }]
  );

  return {
    content: [
      {
        columns: [
          {
            text: [
              {text: 'Colegio Bajos del Cerro Pequeño\n', bold: true}, 
              'La Serena, Chile'
            ],
            style: 'header',
          },
          logo,
        ]
      },
      {
        margin: [0, 20],
        text: 'Reporte de Notas',
        style: 'h1',
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 10,
            x2: 520,
            y2: 10,
            lineWidth: 1,
          }
        ]
      },
      {
        margin: [0, 15],
        columns: [
          {
            text: ['Nombre del Alumno:\n', 'Rut:\n', 'Curso:\n', 'Fecha:\n'],
            bold: true,
            fontSize: 13,
          },
          {
            text: [
              `${student.names+' '+student.lastNames}\n`,
              `${student.rut}\n`,
              `${course.name+' '+course.educationalLevel}\n`,
              `${new Date().toLocaleDateString()}\n`,
            ],
            alignment: 'right',
            fontSize: 13,
          },
        ],
      },
      {
        margin: [0, 20],
        layout: 'lightHorizontalLines',
        table: {
          widths: ['*', 'auto'],
          body: tableBody,
        },
      },
      {
        margin: [0, 20],
        text: 'Justificaciones:',
      }
    ],
    styles: styles,
  };
};
