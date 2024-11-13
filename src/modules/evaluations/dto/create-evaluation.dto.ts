import { IsNotEmpty, IsNumber, IsString, IsDate, IsMongoId, Matches } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}-\d{2}-\d{4}$/)
  date?: string;
}