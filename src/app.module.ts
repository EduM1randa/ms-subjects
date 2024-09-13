import { Module } from '@nestjs/common';
import { SubjectsModule } from './subjects/subjects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SubjectsModule, 
    MongooseModule.forRoot(process.env.MONGO_KEY)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
