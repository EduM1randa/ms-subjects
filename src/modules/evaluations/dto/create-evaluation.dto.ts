import { IsNotEmpty, IsNumber, IsString, IsDate, IsMongoId } from 'class-validator';

export class CreateEvaluationDto {
  @IsMongoId()
  @IsNotEmpty()
  subjectId?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  totalScore?: number;

  @IsDate()
  @IsNotEmpty()
  date?: Date;
}