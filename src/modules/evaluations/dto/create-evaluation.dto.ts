import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  student!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

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