import { IsNotEmpty, IsNumber, IsString, IsDate, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEvaluationDto {
  @IsMongoId()
  @IsNotEmpty()
  student!: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  subject!: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  totalScore!: number;

  @IsNumber()
  @IsNotEmpty()
  obtainedScore!: number;

  @IsNumber()
  @IsNotEmpty()
  grade!: number;

  @IsDate()
  @IsNotEmpty()
  date!: Date;
}