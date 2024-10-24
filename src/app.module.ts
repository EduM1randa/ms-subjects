import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { InscriptionsModule } from './modules/inscriptions/inscriptions.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SubjectsModule, 
    MongooseModule.forRoot(process.env.MONGO_KEY), 
    InscriptionsModule, 
    CoursesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
