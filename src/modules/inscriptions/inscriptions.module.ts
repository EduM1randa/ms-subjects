import { Module } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionsController } from './inscriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InscriptionSchema } from './schemas/inscription.schema';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from 'src/common/connections/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ 
    name: 'Inscription', 
    schema: InscriptionSchema 
  }]),
  CoursesModule,
  UsersModule,
  ],
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
  exports: [InscriptionsService]
})
export class InscriptionsModule {}
