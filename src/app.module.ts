import { Module } from '@nestjs/common';
import { SubjectsModule } from './subjects/subjects.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SubjectsModule, 
    MongooseModule.forRoot("mongodb+srv://codenative:c0d3n4t1v3@cluster0.zdt5d.mongodb.net/ms-subjects?retryWrites=true&w=majority&appName=Cluster0")
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
