import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { InscriptionStatus } from "../../../common/enum/inscription-status.enum";

export class CreateInscriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  studentId?: string;

  @IsMongoId()
  @IsNotEmpty()
  courseId?: string;

  @IsDate()
  @IsNotEmpty()
  date?: Date;

  @IsEnum(InscriptionStatus)
  @IsNotEmpty()
  status?: InscriptionStatus;
}
