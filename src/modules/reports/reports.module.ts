import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from '../printer/printer.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { GradesModule } from '../grades/grades.module';
import { UsersModule } from 'src/common/connections/users.module';
import { AttendanceModule } from 'src/common/connections/attendance.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    PrinterModule,
    SubjectsModule,
    GradesModule,
    UsersModule,
    AttendanceModule,
    CoursesModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
