import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { InscriptionsModule } from './modules/inscriptions/inscriptions.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { CoursesModule } from './modules/courses/courses.module';
import { EvaluationsModule } from './modules/evaluations/evaluations.module';
import { GradesModule } from './modules/grades/grades.module';
import { UsersModule } from './common/connections/users.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PrinterModule } from './modules/printer/printer.module';
import { AttendanceModule } from './common/connections/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SubjectsModule, 
    MongooseModule.forRoot(process.env.MONGODB_URI_BASE || ''), 
    InscriptionsModule, 
    CoursesModule, 
    EvaluationsModule, 
    GradesModule,
    UsersModule,
    SchedulesModule,
    ReportsModule,
    PrinterModule,
    AttendanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
