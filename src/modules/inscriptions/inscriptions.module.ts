import { Module } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionsController } from './inscriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InscriptionSchema } from './schemas/inscription.schema';
import { SubjectsModule } from '../subjects/subjects.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [MongooseModule.forFeature([{ 
    name: 'Inscription', 
    schema: InscriptionSchema 
  }]),
  CoursesModule,
  ],
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
  exports: [InscriptionsService]
})
export class InscriptionsModule {}
