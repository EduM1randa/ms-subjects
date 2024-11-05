import { Module } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionsController } from './inscriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InscriptionSchema } from './schemas/inscription.schema';

@Module({
  imports: [MongooseModule.forFeature([{ 
    name: 'Inscription', 
    schema: InscriptionSchema 
  }])],
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
})
export class InscriptionsModule {}
