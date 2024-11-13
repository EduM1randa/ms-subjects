import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { InscriptionStatus } from '../../../common/enum/inscription-status.enum';
import { InscriptionType } from '../../../common/enum/inscription-type.enum';

export class CreateInscriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  studentId?: string;

  @IsMongoId()
  @IsOptional()
  courseId?: string;

  @IsMongoId()
  @IsOptional()
  electiveId?: string;

  @IsEnum(InscriptionStatus)
  @IsNotEmpty()
  status?: InscriptionStatus;

  @IsEnum(InscriptionType)
  @IsNotEmpty()
  type?: InscriptionType;
}